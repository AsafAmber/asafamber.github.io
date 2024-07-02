const localConnection = new RTCPeerConnection();
const remoteConnection = new RTCPeerConnection();
let sendChannel;
let receiveChannel;
let fileMeta;

const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');
const receiveBox = document.getElementById('receiveBox');

sendButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        fileMeta = { size: file.size, name: file.name };
        sendFile(file);
    }
});

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = async (message) => {
    try {
        let data;
        try {
            data = JSON.parse(message.data);
            console.log("parse success");
        } catch (e) {
            console.log("parse failed");
            handleFileData(message.data);
            return;
        }

        if (data.sdp) {
            if (data.sdp.type === 'offer') {
                await remoteConnection.setRemoteDescription(data.sdp);
                const answer = await remoteConnection.createAnswer();
                await remoteConnection.setLocalDescription(answer);
                ws.send(JSON.stringify({ sdp: remoteConnection.localDescription }));
            } else if (data.sdp.type === 'answer') {
                await localConnection.setRemoteDescription(data.sdp);
            }
        } else if (data.candidate) {
            const candidate = new RTCIceCandidate(data.candidate);
            if (data.isLocal) {
                await localConnection.addIceCandidate(candidate);
            } else {
                await remoteConnection.addIceCandidate(candidate);
            }
        } else if (data.fileMeta) {
            fileMeta = data.fileMeta;
            console.log("File metadata received:", fileMeta);
        }
    } catch (e) {
        console.error('Failed to process message', e);
    }
};

localConnection.onicecandidate = ({ candidate }) => {
    if (candidate) {
        ws.send(JSON.stringify({ candidate, isLocal: true }));
    }
};

remoteConnection.onicecandidate = ({ candidate }) => {
    if (candidate) {
        ws.send(JSON.stringify({ candidate, isLocal: false }));
    }
};

function sendFile(file) {
    sendChannel = localConnection.createDataChannel('sendDataChannel');
    sendChannel.binaryType = 'arraybuffer';
    sendChannel.onopen = () => {
        ws.send(JSON.stringify({ fileMeta }));
        const chunkSize = 16 * 1024;
        let offset = 0;
        const reader = new FileReader();

        reader.onload = (event) => {
            sendChannel.send(event.target.result);
            offset += chunkSize;
            if (offset < file.size) {
                readSlice(offset);
            }
        };

        const readSlice = (o) => {
            const slice = file.slice(o, o + chunkSize);
            reader.readAsArrayBuffer(slice);
        };

        readSlice(0);
    };

    localConnection.createOffer().then(offer => {
        return localConnection.setLocalDescription(offer);
    }).then(() => {
        ws.send(JSON.stringify({ sdp: localConnection.localDescription }));
    });

    remoteConnection.ondatachannel = (event) => {
        receiveChannel = event.channel;
        receiveChannel.binaryType = 'arraybuffer';
        let receivedBuffers = [];

        receiveChannel.onmessage = (event) => {
            receivedBuffers.push(event.data);

            if (receivedBuffers.reduce((acc, chunk) => acc + chunk.byteLength, 0) >= fileMeta.size) {
                const receivedBlob = new Blob(receivedBuffers);
                displayReceivedFile(receivedBlob, fileMeta.name);
                receivedBuffers = [];
            }
        };
    };
    console.log("send success!");
}

function handleFileData(data) {
    console.log("handleFileData1");
    console.log(receiveChannel);
    console.log(!receiveChannel);
    if (!receiveChannel) return;
    let receivedBuffers = [];
    console.log("handleFileData2");
    receivedBuffers.push(data);

    if (receivedBuffers.reduce((acc, chunk) => acc + chunk.byteLength, 0) >= fileMeta.size) {
        console.log("if entered");
        const receivedBlob = new Blob(receivedBuffers);
        displayReceivedFile(receivedBlob, fileMeta.name);
        receivedBuffers = [];
    }
}

function displayReceivedFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.textContent = `Download ${fileName}`;
    receiveBox.appendChild(link);

    if (fileName.match(/\.(jpeg|jpg|gif|png)$/)) {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        receiveBox.appendChild(img);
    }
}
