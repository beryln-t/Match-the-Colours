let intervalId;

const getTimer = (timeLimit, onTimesUp) => {
  let { minutes, seconds } = convertMsToMinutesAndSeconds(timeLimit);

  const useStartTimer = () => {
    useStopTimer();
    countdownTimer.classList.remove("timeAlert");
    let startTime = performance.now();
    intervalId = setInterval(function () {
      var now = performance.now();

      let timeRemaining = timeLimit - (now - startTime);

      let { minutes: minResult, seconds: secResult } =
        convertMsToMinutesAndSeconds(timeRemaining);
      minutes = minResult;
      seconds = secResult;

      useSetTimerHTML(minutes, seconds);

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
    document.getElementById("countdownTimer").innerHTML =
      minutes + ":" + seconds;
  };

  function convertMsToMinutesAndSeconds(timeRemaining) {
    let seconds = Math.round((timeRemaining / 1000) % 60);
    let minutes = Math.floor(timeRemaining / 1000 / 60);

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
