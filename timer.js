let intervalId;

const getTimer = (timeLimit, onTimesUp) => {
  let { minutes, seconds } = convertMsToMinutesAndSeconds(timeLimit);

  const useStartTimer = () => {
    useStopTimer();
    countdownTimer.classList.remove("timeAlert");
    let startTime = performance.now();
    intervalId = setInterval(function () {
      // Get the current time
      var now = performance.now();

      // Find the remaining time
      let timeRemaining = timeLimit - (now - startTime);

      // Calculate remaining minutes and seconds
      let { minutes: minResult, seconds: secResult } =
        convertMsToMinutesAndSeconds(timeRemaining);
      minutes = minResult;
      seconds = secResult;

      useSetTimerHTML(minutes, seconds);

      // If the countdown is over, display a message and stop the timer
      if (timeRemaining < 0) {
        clearInterval(intervalId);
        setTimesUpHTML();
      }

      if (timeRemaining <= 10000) {
        countdownTimer.classList.add("timeAlert");
      }
    }, 1000);
  };

  const setTimesUpHTML = () => {
    document.getElementById("countdownTimer").innerHTML = "TIME'S UP!";
    if (onTimesUp()) {
      onTimesUp();
    }
  };

  const useStopTimer = () => {
    countdownTimer.classList.remove("timeAlert");
    clearInterval(intervalId);
  };

  const useSetTimerHTML = () => {
    // Display the countdown in the element with id="timer"
    document.getElementById("countdownTimer").innerHTML =
      minutes + ":" + seconds;
  };

  function convertMsToMinutesAndSeconds(timeRemaining) {
    let seconds = Math.round((timeRemaining / 1000) % 60);
    let minutes = Math.floor(timeRemaining / 1000 / 60);

    // Add leading zeros if necessary
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return { seconds: seconds, minutes: minutes };
  }

  return {
    useStartTimer: useStartTimer,
    useSetTimerHTML: useSetTimerHTML,
    useStopTimer: useStopTimer,
  };
};

// Update the countdown every second

/*
Before:
  useStartTimer(timing);
  useSetTimerHTML(minutes, seconds);

After:
  const { useStartTimer, useSetTimerHTML} = useTimer(timing);
  useStartTimer();
  useSetTimerHTML();
*/
