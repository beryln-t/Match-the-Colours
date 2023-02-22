let intervalId;

// Update the countdown every second
const startTimer = (timeLimit) => {
  let startTime = Date.now();
  intervalId = setInterval(function () {
    // Get the current time
    var now = Date.now();

    // Find the remaining time
    var timeRemaining = timeLimit - (now - startTime);

    // Calculate remaining minutes and seconds
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Add leading zeros if necessary
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    // Display the countdown in the element with id="timer"
    document.getElementById("countdownTimer").innerHTML =
      minutes + ":" + seconds;

    // If the countdown is over, display a message and stop the timer
    if (timeRemaining < 0) {
      clearInterval(intervalId);
      document.getElementById("countdownTimer").innerHTML = "TIME'S UP!";
    }
  }, 1000);
};
