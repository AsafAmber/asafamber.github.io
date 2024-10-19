const localConnection = new RTCPeerConnection();
const remoteConnection = new RTCPeerConnection();
let sendChannel;
let receiveChannel;
let fileMeta;
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');
const receiveBox = document.getElementById('receiveBox');
var sendOk = false;
const buttonSendText = document.getElementById('sendButtonText');
//

let username = prompt("Please enter your username: ");
while (username == null || username == "") {
  username = prompt("Please enter your username: ");
}
document.getElementById('username').innerHTML += username;


const wss1 = new WebSocket('ws://localhost:8080');
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]};
const peerConnection = new RTCPeerConnection(configuration);
const dataChannel = peerConnection.createDataChannel("MYdataChannel");
peerConnection.addEventListener('datachannel', (event) => {
    const dataChannel = event.channel;
});
/*dataChannel.addEventListener("open", (event) => {
  beginTransmission(dataChannel);
});*/

//requestRemoteChannel(dataChannel.id);

const messageBox = document.querySelector('#textArea');
const sendButtonText = document.querySelector('#sendButtonText');
// Send a simple text message when we click the button
/*buttonSendText.addEventListener('click', event => {
    sendOk = false;
    const message = messageBox.textContent;
    document.getElementById('incomingMessages').innerHTML += "----" + message + '\n';
    wss1.send(message);
});*/

const incomingMessages = document.querySelector('#incomingMessages');
function sendMessage() {
  let message = document.getElementById('textArea').value;
  const messageElement = document.createElement('div');
  messageElement.textContent = "me: " + message.replace(/\n/g, "\n       ");
  messageElement.style.borderLeft = "thick solid #004d99";
  receiveBox.appendChild(messageElement);
  message = username + ": " + message;
  wss1.send(message);
}
/*wss1.onmessage = function(event) {
  const message = event.data;

  // Create a new div element for the incoming message
  const messageElement = document.createElement('div');
  messageElement.textContent = message;

  // Append the new message to the message display div
  receiveBox.appendChild(messageElement);
}*/
//
///
wss1.onmessage = function(event) {
    const blob = event.data;

    // Check if the data is a Blob object
    if (blob instanceof Blob) {
        // Convert Blob to text
        blobToText(blob).then(text => {
            //displayMessage(text); //original
            convertToDiv2(text); //test
        }).catch(error => {
            console.error('Error reading Blob:', error);
        });
    } else {
        // Handle non-Blob messages if necessary
        console.log('Received non-Blob data:', blob);
    }
};

// Function to convert Blob to text
function blobToText(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error('Failed to read Blob as text'));
        };
        reader.readAsText(blob);
    });
}

// Function to display message in the div
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.borderLeft = "thick solid white"
    receiveBox.appendChild(messageElement);
}
function convertToDiv2(message) {
  //let textareaContent = document.getElementById("textArea").value;
  //let divTest = document.getElementById("testRun");
  //let str = "";
  let len = 0;
  while(message[len] + message[len + 1] != ": ") {
    len++;
  }
  len+= 1;
  let arr = new Array((2 * len) + 1);
  arr[0] = "\n";
  for (let i = 1; i < 2 * len + 1; i += 2) {
    arr[i] = " ";
    arr[i + 1] = " ";
  }

  let str = "";
  for (let i = 0; i < 2 * len; i++) {
    if (arr[i] == undefined || arr[i] == null) {
      break;
    }
    str+=arr[i];
  }
  str+=" ";
  const messageElement = document.createElement('div');
  messageElement.textContent = message.replace(/\n/g, str);
  messageElement.style.borderLeft = "thick solid white"
  receiveBox.appendChild(messageElement);
  //divTest.innerHTML = '<div dir = "auto">' + textareaContent.replace(/\n/g, '<br>') + '</div>';
}
//add class to div with img in editable div
function addClass(divTest) {
  let src = "<img";
  let text = divTest.inenerHTML;
  let index = 0;
}


function spellCheckOnOff() {
  let checkBox = document.getElementById("checkBox");
  document.getElementById("textArea").setAttribute("spellcheck", checkBox.checked);
}
