// click to reveal colours
// tableData.addEventListener("click", (event) => {
//   console.log("Event target ", event.target);
//   tableData.classList.remove("boardConceal");
// });

// const changeToInstructionMessage = () => {
//   gameMessage.innerHTML =
//     "Welcome to match the colours, where the objective of the game is, you've guessed it, match the colours! To win, complete matching all the colours before the timer runs out. But wait there's a catch! For each wrong match a life will be deducted, so choose wisely!<br>To start, click on the <Start> button, then click on any tiles to begin matching! Enjoy!</Start>";
// };

//to call above function
// changeToEmptyGameMessage();

const hideStartMessage = () => {
  startMessage.style.display = "none";
};

const changeToEmptyGameMessage = () => {
  gameMessage.style.display = "none";
};

const changeToWinMessage = () => {
  gameMessage.textContent = "Win / lose message";
};

//<-Restart-> button
// const refreshTableCallBack = (event) => {
//   firstRevealTableDataEl=0
//   secondRevealTableDataEl=0
// };

// document
//   .querySelector(".restartButton")
//   .addEventListener("click", refreshTableCallBack);

if (livesRemainingEl.value > 0) {



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
    }

    setTimeout(() => {
      secondRevealTableDataEl.classList.add("boardConceal");
      firstRevealTableDataEl.classList.add("boardConceal");
    }, 500);
  }
};

document
  .querySelector("#gameTable")
  .addEventListener("click", gameTableOnClickCallBack);

//win conditions
if (correctMatchesEl.value === totalMatchesEl.value) {
  console.log(win);
}
