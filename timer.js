// const timer = document.querySelector("#countdownTimer");
// let timerInterval;

// const startTimer = () => {
//   console.log("Start timer");
//   clearInterval(timerInterval);
//   let second = 0,
//     minute = 2,
//     hour = 0;

//   timerInterval = setInterval(function () {
//     timer.classList.toggle("odd");
//     if (minute == 0 && second == 0) {
//       return;
//     }

//     timer.innerHTML =
//       (hour ? hour + ":" : "") +
//       (minute < 10 ? "0" + minute : minute) +
//       ":" +
//       (second < 10 ? "0" + second : second);
//     second--;

//     if (minute == 2) {
//       minute--;
//       second = 59;
//       second--;
//     }

//     if (second == 0) {
//       minute--;
//       second = 59;
//       second--;
//     }

//     // if (minute == 0 && second < 00) {
//     //   clearInterval(timeInterval);
//     // }

//     console.log(minute);
//     console.log(second);
//   }, 1000);
// };
