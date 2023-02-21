const timer = document.querySelector("#countdownTimer");
let timerInterval;

const startTimer = () => {
  console.log("Start timer");
  clearInterval(timerInterval);
  let second = 0,
    minute = 0,
    hour = 0;

  timerInterval = setInterval(function () {
    timer.classList.toggle("odd");

    timer.innerHTML =
      (hour ? hour + ":" : "") +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    second++;

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
};
