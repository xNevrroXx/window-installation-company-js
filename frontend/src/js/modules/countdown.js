function countdown(matchObj, absoluteEndTimeMs) {
  const mainWrapper = document.querySelector(matchObj.wrapperSel);

  let timeoutId = null;

  setTime();
  setTimeout(() => {
    setTime();
    timeoutId = setInterval(() => {
      setTime();
    }, 1000)
    setTime();
  }, 1000 - new Date().getMilliseconds()) // for brief difference

  function setTime() {
    const presentTimeMs = new Date().getTime();
    const tillEndTimeMs = new Date(absoluteEndTimeMs - presentTimeMs).getTime();

    mainWrapper.querySelector(matchObj.days.numberSel).textContent = getZero(+(tillEndTimeMs / (1000*60*60*24)).toFixed()) ;
    mainWrapper.querySelector(matchObj.hours.numberSel).textContent = getZero(+(tillEndTimeMs / (1000*60*60) % 24).toFixed());
    mainWrapper.querySelector(matchObj.minutes.numberSel).textContent = getZero(+(tillEndTimeMs / (1000*60) % 60).toFixed());
    mainWrapper.querySelector(matchObj.seconds.numberSel).textContent = getZero(+((tillEndTimeMs / 1000) % 60).toFixed());
  }

  function getZero(number) {
    if(number / 10 < 1) {
      return `0${number}`;
    }

    return number;
  }
}

export default countdown;