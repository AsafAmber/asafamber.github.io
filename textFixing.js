/*let notification = null;

dragElement(document.getElementById("mydiv"));
document.getElementById('saveBtn').addEventListener('click', function() {
  var text = document.getElementById('textArea').value;
  var blob = new Blob([text], { type: 'application/msword' });
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'document.doc';
  link.click();
});
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    const newTop = elmnt.offsetTop - pos2;
    const newLeft = elmnt.offsetLeft - pos1;

    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - elmnt.offsetWidth;
    const maxY = window.innerHeight - elmnt.offsetHeight;

    const clampedTop = Math.max(minY, Math.min(maxY, newTop));
    const clampedLeft = Math.max(minX, Math.min(maxX, newLeft));

    elmnt.style.top = clampedTop + "px";
    elmnt.style.left = clampedLeft + "px";

    const textarea = document.getElementById("textArea"); // gets the text area
    const divRect = elmnt.getBoundingClientRect(); //get the size of the div and it position
    const textareaRect = textarea.getBoundingClientRect(); //gets size and position of the text area

    const overlapLeft = Math.max(divRect.left, textareaRect.left); //.max original//i think the problem is here // the bigger distance from the left-side of the page when the other end of the distance is the div or the textarea the bigger distance is the one sent to the function
    const overlapRight = Math.min(divRect.right, textareaRect.right); //.min original //the smaller distance from the right side of the page when the other end of the distance is the div or the textarea the smaller distance is the one sent to the function
    const overlapTop = Math.max(divRect.top, textareaRect.top); //.max original //the bigger distance from the top of the page when the other end of the distance is the div or the textarea the bigger distance is the one sent to the function
    const overlapBottom = Math.min(divRect.bottom, textareaRect.bottom);// .min original // the smaller distance from the bottom of the page when the other end of the distance is the div or the textarea the smaller distance is the one sent to the function
  /*console.log("divRect.width:");
    console.log(divRect.width);
    console.log("textareaRect.width:");
    console.log(textareaRect.width); //

    if (hasHiddenText(textarea, overlapLeft, overlapTop, overlapRight, overlapBottom)) {
      if (!notification) {
        notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = "Text blocked by draggable div";
        document.body.appendChild(notification);
      }

      notification.style.left = overlapLeft + "px";
      notification.style.top = overlapTop + "px";
    } else {
      if (notification) {
        document.body.removeChild(notification);
        notification = null;
      }
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function hasHiddenText(textarea, left, top, right, bottom) {
  const text = textarea.value;
  //const rows = text.split("\n");
  //console.log(rows);
  //const textarea = document.getElementById("textArea");
  const textareaStyle = getComputedStyle(textarea);

  // Calculate lineHeight based on the font size of the textarea
  const fontSize = parseFloat(textareaStyle.fontSize);
  const lineHeight = Math.ceil(fontSize * 1.2); // You can adjust the multiplier as needed 1.2 original
  console.log("fontSize: " + fontSize);

  // Calculate charWidth based on the average character width
  const charWidth = 1057/143;//fontSize * 0.6; // You can adjust the multiplier as needed 0.6 orginal

  // Create a 2D array to represent the contents of the textarea
  //const textArray = rows.map(row => row.split(''));

  //lets create a new improved array
  let len = text.length;

  let aRR = prepToFixText(1);

  const arr = []; //this array is empty because I use it to get the value "undefined"

  // Determine the row and column indices for the top-left and bottom-right corners of the div
  const startRow = Math.floor(top / lineHeight);
  const startCol = Math.floor(left / charWidth) - 1;
  const endRow = Math.ceil(bottom / lineHeight);
  const endCol = Math.ceil(right / charWidth) - 1;
  console.log("startRow is");
  console.log(startRow,  endRow, startCol, endCol);
  //console.log(aRR[0][130]);
  let used = 0, temp;
  const numOfRows = prepToFixText(3);
  // Check if any of the characters within the div's bounding box are not empty
  orderArrByDir(aRR, numOfRows, text, textarea); //find true directions
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (aRR[row] && aRR[row][col] !== ' ' && aRR[row][col] !== arr[0]) {
        //textarae.value = arrayToString(aRR);
        return true;
      }
    }
    used = 0;
  }
  return false;
}
*/
// ok so some needed fixes lets make it so that only a button calls the string fixing
function prepToFixText(returnById) { //returnById : 4-defualt (do nothing), 1-aRR, 2 - len, 3 -numOfRows;
  const textarea = document.getElementById("textArea"); // gets the text area
  const text = textarea.value;

  let arrNull = [];
  //const rows = text.split("\n");
  //console.log(rows);
  //const textarea = document.getElementById("textArea");
  //const textareaStyle = getComputedStyle(textarea);

  // Calculate lineHeight based on the font size of the textarea
  //const fontSize = parseFloat(textareaStyle.fontSize);
  //const lineHeight = Math.ceil(fontSize * 1.2); // You can adjust the multiplier as needed 1.2 original

  // Calculate charWidth based on the average character width
  //const charWidth = fontSize * 0.6; // You can adjust the multiplier as needed 0.6 orginal

  // Create a 2D array to represent the contents of the textarea
  //const textArray = rows.map(row => row.split(''));

  //lets create a new improved array
  let len = text.length;
  let lastSpace = -1, sizeOfBiggestWithSpace = 0, sizeOfNextsmallestWord = 144;
  let xStartOflongest = 0;

  //console.log(text);

  /*console.log("hi");
  console.log(len);*/

  //
  let numOfRows = 0, sumOfNewLines = 0, sumOfNormalChars = 0; //maybe numOfRows should start with the value 1 instead of 0? i think it should be 0 because the loop inculdes the last line even if there are 0 lines/rows
  for (let x = 0; x < len; x++) {
      if (text[x] == "\n") {
        sumOfNewLines++;
      }
  }
  numOfRows = Math.ceil((lengthOfArrNoNulls(text) - sumOfNewLines)/143) + sumOfNewLines; //end of way one and lineCount

  //sum = 0;
  //console.log(text);
  /*let numOfRows = 1, sum = 0; //maybe numOfRows should start with the value 1 instead of 0? i think it should be 0 because the loop inculdes the last line even if there are 0 lines/rows
  let posOfLASTSpace = -1;
  for (let x = 0; x < len; x++) {
      if (text[x] == " ") {
        posOfLASTSpace = x;
      }
      if (text[x] == "\n") {
        sum = 0;
        //console.log("?");
        numOfRows = numOfRows + 1;
        continue;
      } else if (sum == 142) { //142 or 143 i am not sure i think it should be 143
        sum = 0;
        //console.log("??");
        numOfRows = numOfRows + 1;
        if (posOfLASTSpace > -1 && posOfLASTSpace != x && canCreateNewLine(textarea, x) == 0) {
          numOfRows++;
        }
        continue;
      }
      if (text[x] !== arrNull[0]) {
        sum = sum + 1;
      }
  }*/
  //

  let posOfLastSpace = -1; //-1 being no space char for now;
  let aRR = new Array(numOfRows), posAtText = 0;
  //change it to a 2d array:
  for (let y = 0; y < numOfRows; y++) {
    aRR[y] = []; //create a new cell in the 2d array
  }
  arrCreator(textarea, numOfRows, aRR, text);
  //orderArrByDir(aRR, numOfRows, text, textarea);
  //textarea.value = arrayToString(aRR, len, numOfRows); //old placement
  if (returnById == 1) { //could change to switch case
    return aRR;
  } else if (returnById == 2) {
    return len;
  } else if (returnById == 3) {
    return numOfRows;
  } else {
    //console.log(aRR);
    console.log(textarea.value);
    console.log(numOfRows);
    textarea.value = arrayToStringUpdated(aRR, numOfRows);
    return;
  }
}


//
function arrayToStringUpdated(arR, numofLines) {
  let result = '';
  for (let i = 0; i < numofLines; i++) {
    for (let j = 0; j < arR[i].length; j++) {
      if (arR[i][j] !== undefined && arR[i][j] !== null) {
        result += arR[i][j];
      } else {
        break; // End of line reached
      }
    }
  }
  return result;
}

//
//func below will take care of math rtl to ltr fixes
function dirFixRtlToLtr() {
  const textarea = document.getElementById("textArea");
  const text = textarea.value;
  console.log(text);
  let arr = prepToFixText(1);
  let numofLines = prepToFixText(3);
  let temp, specialChar = 0, strtIndex = 0;
  let selection = window.getSelection();
  let start = textarea.selectionStart, end = textarea.selectionEnd;
  let helpArr = 0, newText = 0;
  if(selection.toString().length > 0) {
    console.log(selection.toString());
    console.log("start: " + start);
    console.log("end: " + end);
    helpArr = new Array(end - start);
    for (let i = 0; i < end - start; i++) {
      helpArr[i] = text[start+i];
      if (helpArr[i] == "^") {
        specialChar = 1;
        strtIndex = i + start;
      } else if ((helpArr[i].charCodeAt(0) < 48 || helpArr[i].charCodeAt(0) > 57) && i > 0 && helpArr[i] != "-" && helpArr[i] != "+" && helpArr[i] != ".") {
        specialChar = 1;
        strtIndex = i + start;
      }
    }
    if((helpArr[0].charCodeAt(0) < 48 || helpArr[0].charCodeAt(0) > 57) && specialChar == 0) {
      temp = helpArr[0];
      for (let i = 0; i < end - start - 1; i++) {
        helpArr[i] = helpArr[i + 1];
      }
      helpArr[end - start - 1] = temp;
    } else if (specialChar == 1) {
      let tempArr = new Array(strtIndex + 1 - start);
      for (let i = 0; i < end - start; i++) {
        if (start + i < strtIndex) {
          helpArr[end - 1 - start - i] = text[strtIndex - 1 - i];
        } else if (start + i == strtIndex) {
          helpArr[end - 1 - start - i] = text[strtIndex];
        } else  {
          helpArr[start + i - strtIndex - 1] = text[start + i];
        }
      }
    }

    newText = text.substring(0, start) + helpArr.join('') + text.substring(end);
    arrCreator(textarea, numofLines, arr, newText);
    textarea.value = arrayToStringUpdated(arr, numofLines);  //apply changes
  }

  //console.log(helpArr);
  console.log(newText); //apply changes
  return;
}
function lengthOfArrNoNulls(arr) {
  let lenNoNulls = arr.length;
  let arrNull = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == arrNull[0]) {
      lenNoNulls--;
    }
  }
  return lenNoNulls;
}
function canCreateNewLine(textarea, posAtText) {
    if (posAtText == -1)
      return 0;
    let multiplier = Math.ceil(posAtText / 143);
    let posAtEnd = 143 * multiplier;
    let text = textarea.value;
    for (let i = 0; i < posAtEnd - posAtText; i++) {
      if (text[i + posAtText] == " ")
        return 1;
    }
    return 0;
}
function arrCreator(textarea, numofLines, arr, text) {
  if (arr == [])
    return;
  let a = 0, b = 0, posAtText = 0, x = 0, y = 0;
  let spacePos = -1, endspace = -1, actualpos = 0;
  let arrNull = [], arrnew = [];
  let newpos = -1;
  let moveTrue = 0, moveBy = 0;
  while(a < numofLines) {
    while(b < 143) {
      arr[a][b] = text[posAtText];
      if(text[posAtText] == "\n") {
        break;
      }
      if (text[posAtText] == " ") {
        spacePos = b;
        actualpos = posAtText;
        if (spacePos == 142) {
          arr[a][b] = "\n";
          break;
        }
      }
      //
      if (b == 142 && text[posAtText] != arrNull[0]) {
        if (spacePos == -1) {
          arr[a][b] = "\n";
          posAtText--;
          break;
        } else {
          arr[a][spacePos] = "\n";
          for (let i = spacePos + 1; i < 143; i++) {
            arr[a][i] = arrNull[0];
          }
          posAtText = posAtText - 143 + spacePos + 1;
          break;
        }
      }
      //
      if (b == 142 && text[posAtText] != arrNull[0]) {
        for (let i = 0; i < spacePos; i++) {
          if(text[posAtText + 1 + i] == " ") {
            endspace = i;
            newpos = posAtText + i;
            arrnew[142 - spacePos + i] = text[posAtText + 1 + i];
          }
        }
        if (endspace == - 1 || spacePos == -1 || spacePos == 142 || actualpos == -1) {
          arr[a][b] = "\n"; //not really the want out put just here for testing
          break;
        }

        for (let j = 0; j < 142 - spacePos; j++) {
          //arrnew[j] = text[actualpos + 1 + j];
          arr[a][spacePos + j +1] = arrNull[0];
        }
        arr[a][spacePos + 1] = "\n"; //end here for testing clac
        /*moveBy = endspace;
        while (arrnew[x] !== arrNull[0]) {
          arr[a + 1][x] = arrnew[x];
          x++;
        }*/
        posAtText = actualpos;
        moveTrue = 1;
        x = 0;
        //a++;
        break; //just so we dont do another "posAtText++;"
      }
      posAtText++;
      b++;
    }
    a++;
    b = 0;
    posAtText++;
    actualpos = -1;
    if (moveTrue == 1) {
    //  b = endspace;
      //posAtText = newpos;
    }
    moveTrue = 0;
    arrnew = [];
    endspace = - 1;
    spacePos = -1;
  }
  console.log(arr);
}
function isALetter(letter, retType) {
  let ahlap = 'א', tepth = 'ת';
  let asciiValAhlap = ahlap.charCodeAt(0), asciiValTepth = tepth.charCodeAt(0);
  if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
    if (retType == 0) {
      return true;
    } else {
      return 0; //English char
    }
  } else if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
    if (retType == 0) {
      return true;
    } else {
      return 0; //English char
    }
  } else if (letter.charCodeAt(0) >= asciiValAhlap && letter.charCodeAt(0) <= asciiValTepth) {
    if (retType == 0) {
      return true;
    } else {
      return 1; //Hebrew char
    }
  }
  return false;
}
function orderArrByDir(arr, numofLines, text, textarea) {
  let boolTOF = 0; //0 for false, 1 for true
  let firstLetter = -2;
  for (let i = 0; i < numofLines; i++) {
    for (let j = 0; j < 143; j++) {
      if (arr[i][j] != undefined) {
        if (isALetter(arr[i][j], 0)) {
          boolTOF = isALetter(arr[i][j], 1);
          break;
        }
      }
    }
    if (boolTOF == 1) {
      swapArrRow(arr, i);
    }
  }
}
function swapArrRow(arr, rowNum) {
  let temp;
  for (let i = 0; i < 143/2; i++) {
    temp = arr[rowNum][i];
    arr[rowNum][i] = arr[rowNum][142 - i];
    arr[rowNum][142- i] = temp;
  }
}
function swapPushByOneLeftAppendEnd() {
  const textarea = document.getElementById("textArea");
  const text = textarea.value;
  let arr = prepToFixText(1);
  let numofLines = prepToFixText(3);
  let temp;
  let selection = window.getSelection();
  let start = textarea.selectionStart, end = textarea.selectionEnd;
  let helpArr = new Array(end - start);
  for (let i = 0; i < end - start - 1; i++) {
    helpArr[i+1] = text[start + i];
  }
  helpArr[0] = text[end - 1];
  /*temp = helpArr[0];
  helpArr[0] = helpArr[end - start - 1];
  helpArr[end - start - 1] = temp;*/
  newText = text.substring(0, start) + helpArr.join('') + text.substring(end);
  /*temp = text[start];
  text[start] = text[end - 1];
  text[end - 1] = temp;*/
  arrCreator(textarea, numofLines, arr, newText);
  textarea.value = arrayToStringUpdated(arr, numofLines);
}
function convertToDiv() {
  let textareaContent = document.getElementById("textArea").value;
  let divTest = document.getElementById("testRun");
  let str = "";
  let index = 0;
  let elemtStrt = false;
  divTest.innerHTML = '<div dir = "auto">' + textareaContent.replace(/\n/g, '<br>') + '</div>';
  text = divTest.innerHTML;
  let endResult = text;
  while(index < text.length) {
    if (text[index] == "<") {
      if (text.substring(index, index + 4) == "<img") {
        endResult = endResult.substring(0, index + 4) + " " + "class = ''" + endResult.substring(index + 4);
        index +=4;
      }
    }
    index++;
  }
  //console.log(divTest.innerHTML[1] == "\n");
  //divTest.inenerHTML += '</div>';
}
//add class to div with img in editable div
function addClass(divTest) {
  let src = "<img";
  let text = divTest.inenerHTML;
  let index = 0;
}


//
/*function convertToDivAndAdd() {
  let textareaContent = document.getElementById("textArea").value;
  const messageElement = document.createElement('div');
  messageElement.textContent = textareaContent.replace(/\n/g, '<br>');
  messageElement.style.borderLeft = "thick solid white"

  //let divTest = document.getElementById("testRun");
  let index = 0;
  let elemtStrt = false;
  text = divTest.innerHTML;
  let endResult = text;
  while(index < text.length) {
    if (text[index] == "<") {
      if (text.substring(index, index + 4) == "<img") {
        endResult = endResult.substring(0, index + 4) + " " + "class = ''" + endResult.substring(index + 4);
        index +=4;
      }
    }
    index++;
  }
  //console.log(divTest.innerHTML[1] == "\n");
  //divTest.inenerHTML += '</div>';
}*/
