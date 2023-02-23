/*----- constants -----*/
let level = 1;
let clickOrder = 1;
let timing = 60000;
let isTableFirstClick = false;

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

/*----- cached elements  -----*/
currentLevelEl.value = level;
correctMatchesEl.value = 0;
totalMatchesEl.value = calculateColorSize(level);
livesRemainingEl.value = Math.round(calculateGridSize(level) ** 2 * 0.7);
let firstRevealedColor = null;
let secondRevealedColor = null;
let firstRevealTableDataEl = null;
let secondRevealTableDataEl = null;

/*----- functions -----*/

/*----- Initialize Game -----*/

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
  getTimer(timing).useStopTimer();
  resetGameStats();
  hideGameStateMessages();
  hideTable();
  startMessage.classList.remove("hide");
  gameStats.classList.add("hide");
  startButton.removeAttribute("disabled");
  homeButton.setAttribute("disabled", true);
  restartButton.setAttribute("disabled", true);
  prevButton.setAttribute("disabled", true);
  nextButton.setAttribute("disabled", true);
};

initializeGame();

/*----- OnStart -----*/

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
    let color = colorsArr[randomIndex].code.hex;

    if (colorsSelectedList.includes(color)) {
      return getRandomColor(colorsSelectedList, colorsArr);
    }
    return color;
  };

  return {
    pickRandomInteger,
    getRandomColor,
  };
};

const generateTableFunction = () => {
  gameTable.innerHTML = "";

  let colors = [];
  let gridSize = calculateGridSize(level);
  let colorSize = calculateColorSize(level);
  let table = document.createElement("table");

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

      tableData.style.backgroundColor = colors[randomIndex];

      tableData.setAttribute("data-color", colors[randomIndex]);
      colors.splice(randomIndex, 1);
      tableData.className = "boardConceal";
      tableRow.append(tableData);
    }
    table.append(tableRow);
  }
  gameTable.append(table);
  gameBoard.append(gameTable);
};

const onStart = () => {
  isTableFirstClick = false;
  getTimer(timing).useStopTimer();
  getTimer(timing).useSetTimerHTML();
  unhideTable();
  showGameStats();
  resetGameStats();
  enableButtonsOnStart();
  hideAllGameMessage();
  generateTableFunction();
};

/*----- Game Board & Game Logic -----*/

const gameTableOnClickCallBack = (event) => {
  let tableData = event.target;
  let isTableDataOpen = tableData.getAttribute("data-is-open");

  if (tableData.tagName !== "TD" || Number(isTableDataOpen) === 1) {
    return;
  }

  if (!isTableFirstClick) {
    getTimer(timing, onLose).useStartTimer();
    isTableFirstClick = true;
  }

  tableData.setAttribute("data-is-open", 1);

  tableData.classList.remove("boardConceal");

  if (clickOrder === 1) {
    firstRevealedColor = tableData.getAttribute("data-color");
    firstRevealTableDataEl = tableData;
    clickOrder = 2;
  } else if (clickOrder === 2) {
    secondRevealedColor = tableData.getAttribute("data-color");
    secondRevealTableDataEl = tableData;
    clickOrder = 1;

    if (livesRemainingEl.value > 0) {
      if (firstRevealedColor === secondRevealedColor) {
        correctMatchesEl.value++;
        firstRevealTableDataEl.classList.add("changeSaturation");
        secondRevealTableDataEl.classList.add("changeSaturation");
      } else {
        livesRemainingEl.value--;

        setTimeout(() => {
          secondRevealTableDataEl.classList.add("boardConceal");
          firstRevealTableDataEl.classList.add("boardConceal");
          firstRevealTableDataEl.setAttribute("data-is-open", 0);
          secondRevealTableDataEl.setAttribute("data-is-open", 0);
        }, 300);
      }
    }
  }

  if (
    livesRemainingEl.value == 0 ||
    (correctMatchesEl.value != totalMatchesEl.value && timing === 0)
  ) {
    onLose();
  }

  if (correctMatchesEl.value == totalMatchesEl.value && timing !== 0) {
    onWin();
  }
};

const onLose = () => {
  getTimer(timing).useStopTimer();
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
    getTimer(timing).useStopTimer();
    hideTable();
    startButton.setAttribute("disabled", true);
  }, 200);
  setTimeout(() => {
    nextButton.removeAttribute("disabled");
    if (currentLevelEl.value == 1) {
      firstWinMessage.classList.remove("hide");
    } else if (currentLevelEl.value > 1) {
      subsequentWinMessage.classList.remove("hide");
    }
  }, 300);
};

const maxLevelReached = () => {
  if (currentLevelEl.value == 13) {
    hideAllGameMessage();
    hideTable();
    gameStats.classList.add("hide");
    maxLevelMessage.classList.remove("hide");
    startButton.setAttribute("disabled", true);
    restartButton.setAttribute("disabled", true);
  }
};

/*----- Other Game Buttons -----*/

const commonResets = () => {
  getTimer(timing).useStopTimer();
  getTimer(timing).useSetTimerHTML();
  showGameStats();
  resetGameStats();
  hideAllGameMessage();
  enableButtonsOnStart();
  unhideTable();
  generateTableFunction();
};

const onRestart = () => {
  isTableFirstClick = false;
  commonResets();
};

const onPrev = () => {
  isTableFirstClick = false;
  level--;
  timing -= 30000;
  commonResets();
};

const onNext = () => {
  isTableFirstClick = false;
  level++;
  timing += 30000;
  commonResets();
  nextButton.setAttribute("disabled", true);
  maxLevelReached();
};

/*----- event listeners -----*/

document
  .querySelector("#gameTable")
  .addEventListener("click", gameTableOnClickCallBack);
