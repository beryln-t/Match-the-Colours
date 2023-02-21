/*----- constants -----*/
let level = 1; //Maximum level 10 due to number colors limitation //need to disable next button.

let clickOrder = 1; // It can be 1 or 2
let firstRevealedColor = null;
let secondRevealedColor = null;
let firstRevealTableDataEl = null;
let secondRevealTableDataEl = null;

/*----- state variables -----*/
let gameMessage = document.querySelector("#gameMessage");

/*----- cached elements  -----*/

let currentLevelEl = document.querySelector("#currentLevel");
currentLevelEl.value = level;
let correctMatchesEl = document.querySelector("#correctMatches");
correctMatchesEl.value = 0;

const calculateGridSize = (level) => {
  return 2 * level + 2;
};

const calculateColorSize = (level) => {
  return 2 * level ** 2 + 4 * level + 2;
};
let totalMatchesEl = document.querySelector("#totalMatches");
console.log(totalMatchesEl);
totalMatchesEl.value = calculateColorSize(level);

let livesRemainingEl = document.querySelector("#livesRemaining");
livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.4);

//timer

/*----- event listeners -----*/

/*----- functions -----*/
// game messages//
const changeToEmptyGameMessage = () => {
  gameMessage.style.display = "none";
};

const changeToInstructionMessage = () => {
  gameMessage.innerHTML =
    "Welcome to match the colours, where the objective of the game is, you've guessed it, match the colours! To win, complete matching all the colours before the timer runs out. But wait there's a catch! For each wrong match a life will be deducted, so choose wisely!<br>To start, click on the <Start> button, then click on any tiles to begin matching! Enjoy!</Start>";
};

const changeToWinMessage = () => {
  gameMessage.textContent = "Win / lose message";
};

//game

const initializeGame = () => {
  changeToInstructionMessage();

  // Whatever function that you initialized
};

// Found on stackover flow to select a random number
const pickRandomInteger = (maxLength) => {
  return Math.floor(Math.random() * (maxLength - 0 + 1)) + 0;
};

const getRandomColor = (colorsSelectedList, colorsArr) => {
  let randomIndex = pickRandomInteger(colorsArr.length - 1);
  console.log("RandomIndex ", randomIndex);
  console.log("colorsArr[randomIndex]", colorsArr[randomIndex]);
  let color = colorsArr[randomIndex].code.hex; // generating random colour with random index

  if (colorsSelectedList.includes(color)) {
    return getRandomColor(colorsSelectedList, colorsArr); //making sure it is a unique colour
  }

  return color;
};

const generateTableFunction = () => {
  let gameBoard = document.querySelector("#gameBoard");
  let gameTable = document.querySelector("#gameTable");
  gameTable.innerHTML = ""; //to clear the start message

  let colors = [];
  let gridSize = calculateGridSize(level);
  let colorSize = calculateColorSize(level);
  console.log("Generate table function. Current gridSize is - ", gridSize); //comment
  let table = document.createElement("table");
  table.setAttribute("border", "");

  //setting color
  for (let c = 0; c < colorSize; c++) {
    let color = getRandomColor(colors, colorsList);
    colors.push(color);
    colors.push(color);
  }

  for (let i = 0; i < gridSize; i++) {
    let tableRow = document.createElement("tr");

    for (let h = 0; h < gridSize; h++) {
      let tableData = document.createElement("td");
      let randomIndex = pickRandomInteger(colors.length - 1);
      console.log("randomIndex ", randomIndex);
      tableData.style.backgroundColor = colors[randomIndex];

      console.log("color list ", colors);
      console.log("color selected", colors[randomIndex]);
      tableData.setAttribute("data-color", colors[randomIndex]);
      colors.splice(randomIndex, 1); //removing the color once applied
      tableData.className = "boardConceal";

      // click to reveal colours
      // tableData.addEventListener("click", (event) => {
      //   console.log("Event target ", event.target);
      //   tableData.classList.remove("boardConceal");
      // });

      console.log(tableData.className);
      tableRow.append(tableData);
    }
    table.append(tableRow);
  }
  gameTable.append(table);
  gameBoard.append(gameTable);
};

const onStart = () => {
  let startButton = document.querySelector("#startButton");
  // startButton.setAttribute("disabled", true);
  console.log("Start button is clicked "); // can remove subsequently

  changeToEmptyGameMessage();
  generateTableFunction();
  startTimer();
};

//calling functions
initializeGame();

//Event for any clicks that is happening in the table
const gameTableOnClickCallBack = (event) => {
  console.log("event target ", event.target);
  let tableData = event.target;
  tableData.classList.remove("boardConceal");

  //logging click data
  // First click
  if (clickOrder === 1) {
    firstRevealedColor = tableData.getAttribute("data-color");
    firstRevealTableDataEl = tableData;
    clickOrder = 2;
  }
  // Second click
  else if (clickOrder === 2) {
    secondRevealedColor = tableData.getAttribute("data-color");
    secondRevealTableDataEl = tableData;
    clickOrder = 1;
    //compare clicked data

    if (firstRevealedColor === secondRevealedColor) {
      correctMatchesEl.value++;
    } else {
      livesRemainingEl.value--;

      setTimeout(() => {
        secondRevealTableDataEl.classList.add("boardConceal");
        firstRevealTableDataEl.classList.add("boardConceal");
      }, 500);
    }
  }
};
document
  .querySelector("#gameTable")
  .addEventListener("click", gameTableOnClickCallBack);
