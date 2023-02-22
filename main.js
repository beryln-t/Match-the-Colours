/*----- constants -----*/
let level = 1; //Maximum level 13 due to number colors limitation //need to disable next button.
let clickOrder = 1; // It can be 1 or 2
let timing = 2 * 60 * 1000;
const calculateGridSize = (level) => {
  return 2 * level + 2;
};
const calculateColorSize = (level) => {
  return 2 * level ** 2 + 4 * level + 2;
};

/*----- state variables -----*/

let maxLevelMessage = document.querySelector("#maxLevel");
let gameStats = document.querySelector(".gameStats");
let currentLevelEl = document.querySelector("#currentLevel");
let correctMatchesEl = document.querySelector("#correctMatches");
let totalMatchesEl = document.querySelector("#totalMatches");
let livesRemainingEl = document.querySelector("#livesRemaining");
let startMessage = document.querySelector("#startMessage");
let firstWinMessage = document.querySelector("#firstWinMessage");
let subsequentWinMessage = document.querySelector("#subsequentWinMessage");
let firstLoseMessage = document.querySelector("#firstLoseMessage");
let subsequentLoseMessage = document.querySelector("#subsequentLoseMessage");
let gameBoard = document.querySelector("#gameBoard");
let gameTable = document.querySelector("#gameTable");
let allGameButtons = document.querySelector(".allGameButtons");
let homeButton = document.querySelector("#homeButton");
let startButton = document.querySelector("#startButton");
let restartButton = document.querySelector("#restartButton");
let prevButton = document.querySelector("#prevButton");
let nextButton = document.querySelector("#nextButton");
timer;

/*----- cached elements  -----*/
currentLevelEl.value = level;
correctMatchesEl.value = 0;
totalMatchesEl.value = calculateColorSize(level);
livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.6);
let firstRevealedColor = null;
let secondRevealedColor = null;
let firstRevealTableDataEl = null;
let secondRevealTableDataEl = null;

/*----- event listeners -----*/

/*----- functions -----*/

//initialize game

const hideGameStateMessages = () => {
  firstWinMessage.classList.add("hide");
  subsequentWinMessage.classList.add("hide");
  firstLoseMessage.classList.add("hide");
  subsequentLoseMessage.classList.add("hide");
  maxLevelMessage.classList.add("hide");
};

const hideTable = () => {
  gameTable.classList.add("hide");
};

const unhideTable = () => {
  gameTable.classList.remove("hide");
};

const resetGameStats = () => {
  currentLevelEl.value = level;
  correctMatchesEl.value = 0;
  totalMatchesEl.value = calculateColorSize(level);
  livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.6);
};

const initializeGame = () => {
  level = 1;
  resetGameStats();
  hideGameStateMessages();
  hideTable();
  startMessage.classList.remove("hide");
  gameStats.classList.add("hide");
  startButton.removeAttribute("disabled"); //because if lose then press home, then the start button not there
  homeButton.setAttribute("disabled", true);
  restartButton.setAttribute("disabled", true);
  prevButton.setAttribute("disabled", true);
  nextButton.setAttribute("disabled", true);
};

initializeGame();

//start game
const hideAllGameMessage = () => {
  startMessage.classList.add("hide");
  firstWinMessage.classList.add("hide");
  subsequentWinMessage.classList.add("hide");
  firstLoseMessage.classList.add("hide");
  subsequentLoseMessage.classList.add("hide");
  maxLevelMessage.classList.add("hide");
};

const showGameStats = () => {
  gameStats.classList.remove("hide");
};

const enableButtonsOnStart = () => {
  nextButton.setAttribute("disabled", true);
  homeButton.removeAttribute("disabled");
  startButton.removeAttribute("disabled");
  restartButton.removeAttribute("disabled");
  if (currentLevelEl.value > 1) {
    prevButton.removeAttribute("disabled");
  } else if (currentLevelEl.value == 1) {
    prevButton.setAttribute("disabled", true);
  }
};

const useRandomColorHelp = () => {
  const pickRandomInteger = (maxLength) => {
    return Math.floor(Math.random() * (maxLength - 0 + 1)) + 0;
  };

  const getRandomColor = (colorsSelectedList, colorsArr) => {
    let randomIndex = pickRandomInteger(colorsArr.length - 1);
    let color = colorsArr[randomIndex].code.hex; // generating random colour with random index

    if (colorsSelectedList.includes(color)) {
      return getRandomColor(colorsSelectedList, colorsArr); //making sure it is a unique colour
    }
    return color;
  };

  return {
    pickRandomInteger,
    getRandomColor,
  };
};

const generateTableFunction = () => {
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
    let color = useRandomColorHelp().getRandomColor(colors, colorsList);
    colors.push(color);
    colors.push(color);
  }

  for (let i = 0; i < gridSize; i++) {
    let tableRow = document.createElement("tr");

    for (let h = 0; h < gridSize; h++) {
      let tableData = document.createElement("td");
      let randomIndex = useRandomColorHelp().pickRandomInteger(
        colors.length - 1
      );
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
  unhideTable();
  showGameStats();
  resetGameStats();
  enableButtonsOnStart();
  hideAllGameMessage();
  generateTableFunction();
  startTimer(timing);
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
        }, 300);
      }
    }
  }

  // Condition for on lose
  if (livesRemainingEl.value == 0) {
    onLose();
  }

  // Condition for on win
  if (correctMatchesEl.value == totalMatchesEl.value) {
    onWin();
  }
};

const onLose = () => {
  setTimeout(() => {
    hideTable();
    startButton.setAttribute("disabled", true);
  }, 200);
  setTimeout(() => {
    if (currentLevelEl.value == 1) {
      firstLoseMessage.classList.remove("hide");
    } else if (currentLevelEl.value > 1) {
      subsequentLoseMessage.classList.remove("hide");
    }
  }, 300);
};

const onWin = () => {
  setTimeout(() => {
    hideTable();
    startButton.setAttribute("disabled", true);
  }, 300);
  setTimeout(() => {
    nextButton.removeAttribute("disabled");
    if (currentLevelEl.value == 1) {
      firstWinMessage.classList.remove("hide");
    } else if (currentLevelEl.value > 1) {
      subsequentWinMessage.classList.remove("hide");
    }
  }, 400);
};

document
  .querySelector("#gameTable")
  .addEventListener("click", gameTableOnClickCallBack);

const onRestart = () => {
  resetGameStats();
  enableButtonsOnStart();
  hideAllGameMessage();
  unhideTable();
  generateTableFunction();
};

const onPrev = () => {
  hideAllGameMessage();
  unhideTable();
  level--;
  resetGameStats();
  enableButtonsOnStart();
  generateTableFunction();
};

const onNext = () => {
  hideAllGameMessage();
  unhideTable();
  level++;
  resetGameStats();
  enableButtonsOnStart();
  generateTableFunction();
  nextButton.setAttribute("disabled", true);
};

// if (currentLevelEl.value == 14) {
//   hideAllGameMessage();
//   hideTable();
//   gameStats.classlist.add("hide");
//   allGameButtons.classList.add("hide");
//   maxLevelMessage.classList.remove("hide");
// }
