/*----- constants -----*/
let level = 1; //Maximum level 10 due to number colors limitation //need to disable next button.

let clickOrder = 1; // It can be 1 or 2
let firstRevealedColor = null;
let secondRevealedColor = null;
let firstRevealTableDataEl = null;
let secondRevealTableDataEl = null;

/*----- state variables -----*/

/*----- cached elements  -----*/

let gameMessage = document.querySelector(".gameMessage");
let startMessage = document.querySelector("#startMessage");
let firstWinMessage = document.querySelector("#firstWinMessage");
let subsequentWinMessage = document.querySelector("#subsequentWinMessage");
let loseMessage = document.querySelector("#loseMessage");

let gameStats = document.querySelector(".gameStats");
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
totalMatchesEl.value = calculateColorSize(level);

let livesRemainingEl = document.querySelector("#livesRemaining");
livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.5);

let allGameButtons = document.querySelector(".allGameButtons");
let startButton = document.querySelector("#startButton");
let prevButton = document.querySelector("#prevButton");
let restartButton = document.querySelector("#restartButton");
let nextButton = document.querySelector("#nextButton");

let gameBoard = document.querySelector("#gameBoard");
let gameTable = document.querySelector("#gameTable");
//timer

/*----- event listeners -----*/

/*----- functions -----*/
// game messages//

//initialize game

const initializeGame = () => {
  startMessage.style.display = "block";
  prevButton.setAttribute("disabled", true);
  restartButton.setAttribute("disabled", true);
  nextButton.setAttribute("disabled", true);
};

initializeGame();

const showGameStats = () => {
  gameStats.style.display = "flex";
};

const enableButtons = () => {
  restartButton.removeAttribute("disabled");
  if (currentLevelEl.value > 1) {
    prevButton.removeAttribute("disabled");
  }
};

const hideStartMessage = () => {
  startMessage.style.display = "none";
};
const pickRandomInteger = (maxLength) => {
  return Math.floor(Math.random() * (maxLength - 0 + 1)) + 0;
};

const getRandomColor = (colorsSelectedList, colorsArr) => {
  let randomIndex = pickRandomInteger(colorsArr.length - 1);
  // console.log("RandomIndex ", randomIndex);
  // console.log("colorsArr[randomIndex]", colorsArr[randomIndex]);
  let color = colorsArr[randomIndex].code.hex; // generating random colour with random index

  if (colorsSelectedList.includes(color)) {
    return getRandomColor(colorsSelectedList, colorsArr); //making sure it is a unique colour
  }

  return color;
};

const generateTableFunction = () => {
  // let gameBoard = document.querySelector("#gameBoard");
  // let gameTable = document.querySelector("#gameTable");
  gameTable.innerHTML = ""; //prevent board from duplicating.

  let colors = [];
  let gridSize = calculateGridSize(level);
  let colorSize = calculateColorSize(level);
  console.log("Generate table function. Current gridSize is - ", gridSize); //comment
  console.log("Generate table function. Current colorSize is - ", colorSize); //comment
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
      // console.log("randomIndex ", randomIndex);
      tableData.style.backgroundColor = colors[randomIndex];

      // console.log("color list ", colors);
      // console.log("color selected", colors[randomIndex]);
      tableData.setAttribute("data-color", colors[randomIndex]);
      colors.splice(randomIndex, 1); //removing the color once applied
      tableData.className = "boardConceal";
      tableRow.append(tableData);
    }
    table.append(tableRow);
  }
  gameTable.append(table);
  gameBoard.append(gameTable);
};

//game start
const onStart = () => {
  console.log("Start button is clicked "); // can remove subsequently
  showGameStats();
  enableButtons();
  hideStartMessage();
  generateTableFunction();
  // startTimer();
};

//game play
const gameTableOnClickCallBack = (event) => {
  // console.log("event target ", event.target);
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

    if (livesRemainingEl.value > 0) {
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
  }

  //win lose logic
  //lose
  if (livesRemainingEl.value == 0) {
    // console.log("lose");
    setTimeout(() => {
      gameTable.style.display = "none";
    }, 300);
    setTimeout(() => {
      loseMessage.style.display = "block";
    }, 400);
  }

  //win
  if (correctMatchesEl.value == totalMatchesEl.value) {
    // console.log("win");
    setTimeout(() => {
      gameTable.style.display = "none";
    }, 300);
    setTimeout(() => {
      nextButton.removeAttribute("disabled");
      if (level === 1) {
        firstWinMessage.style.display = "block";
      } else if (level > 1) {
        subsequentWinMessage.style.display = "block";
      }
    }, 400);
  }
};
document
  .querySelector("#gameTable")
  .addEventListener("click", gameTableOnClickCallBack);

//button functions

const onPrev = () => {
  level--;
  currentLevelEl.value = level;
  if (currentLevelEl.value == 1) {
    prevButton.setAttribute("disabled", true);
    generateTableFunction();
  }
};

const onRestart = () => {
  gameMessage.style.display = "none";
  gameTable.style.display = "flex";
  correctMatchesEl.value = 0;
  livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.5);
  generateTableFunction();
};

const onNext = () => {
  gameMessage.style.display = "none";
  gameTable.style.display = "flex";
  level++;
  currentLevelEl.value = level;
  nextButton.setAttribute("disabled", true);
  generateTableFunction();
};
