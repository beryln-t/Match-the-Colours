/*----- constants -----*/
let level = 1; //Maximum level 10 due to number colors limitation

/*----- state variables -----*/
let gameMessage = document.querySelector("#gameMessage");

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/

const calculateGridSize = (level) => {
  return 2 * level + 2;
};

const calculateColorSize = (level) => {
  return 2 * level ** 2 + 4 * level + 2;
};
calculateColorSize(1);

const changeToEmptyGameMessage = () => {
  gameMessage.style.display = "none";
};

const changeToInstructionMessage = () => {
  gameMessage.textContent =
    "Welcome to match the colours, where the objective of the game is, you've guessed it, match the colours! To win, complete matching all the colours before the timer runs out. But wait there's";
};

const changeToWinMessage = () => {
  gameMessage.textContent = "Win / lose message";
};

const initializeGame = () => {
  changeToInstructionMessage();

  // Whatever function that you initialized
};

const startTimer = () => {
  //Start timer
};

// Found on stackover flow to select a random number
const pickRandomInteger = (maxLength) => {
  let randomIndex = Math.floor(Math.random() * (maxLength - 0 + 1)) + 0;
  return randomIndex;
};

const getRandomColor = (colorsSelectedList, colorsArr) => {
  let randomIndex = pickRandomInteger(colorsArr.length - 1);
  console.log("RandomIndex ", randomIndex);
  console.log("colorsArr[randomIndex]", colorsArr[randomIndex]);
  let color = colorsArr[randomIndex].code.hex;

  if (colorsSelectedList.includes(color)) {
    return getRandomColor(colorsSelectedList, colorsArr);
  }

  return color;
};

const generateTableFunction = () => {
  let gameBoard = document.querySelector("#gameBoard");
  let gameTable = document.querySelector("#gameTable");
  gameTable.innerHTML = "";

  let colors = [];
  let gridSize = calculateGridSize(level);
  let colorSize = calculateColorSize(level);
  console.log("Generate table function. Current gridSize is - ", gridSize);
  let table = document.createElement("table");
  table.setAttribute("border", "");

  for (let c = 0; c < colorSize; c++) {
    let color = getRandomColor(colors, colorsList);
    colors.push(color);
    colors.push(color);
  }
  console.log("Total colors list ", colors);

  for (let i = 0; i < gridSize; i++) {
    let tableRow = document.createElement("tr");

    for (let h = 0; h < gridSize; h++) {
      let tableData = document.createElement("td");
      let randomIndex = pickRandomInteger(colors.length - 1);

      tableData.style.backgroundColor = colors[randomIndex];
      colors.splice(randomIndex, 1);
      // console.log("color list ", colors);
      // console.log("color selected", colors[randomIndex]);

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
  console.log("Start button is clicked ");

  changeToEmptyGameMessage();
  generateTableFunction();
  startTimer();
};

initializeGame();
