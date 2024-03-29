main();

function main() {
  const secondHand = document.querySelector(".second-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const hourHand = document.querySelector(".hour-hand");
  const clock = document.querySelector(".clock");
  // const html = document.querySelector("html");
  const html = document.documentElement;

  const hands = [secondHand, minuteHand, hourHand];
  setInterval(setDate.bind(null, hands), 1000);

  const nightBackgroundElements = [
    clock,
    secondHand,
    minuteHand,
    hourHand,
    html,
  ];
  setInterval(setDayNightBackground(nightBackgroundElements), 3600000);
}

function setDate([secondHand, minuteHand, hourHand]) {
  // console.log("doing");
  // const DEFAULT_DEGREE = 90;
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegree = getTimeDegree(seconds, 60);
  // const secondsDegree = (360 / 60) * seconds + DEFAULT_DEGREE;
  preventCounterclockwise(secondHand, secondsDegree);
  secondHand.style.transform = `rotate(${secondsDegree}deg)`;

  const minutes = now.getMinutes();
  const minutesDegree = getTimeDegree(minutes, 60);
  // const minutesDegree = (360 / 60) * minutes + DEFAULT_DEGREE;
  preventCounterclockwise(minuteHand, minutesDegree);
  minuteHand.style.transform = `rotate(${minutesDegree}deg)`;

  const hours = now.getHours();
  const hoursDegree = getTimeDegree(hours, 12);
  // const hoursDegree = (360 / 12) * (hours % 12) + DEFAULT_DEGREE;
  preventCounterclockwise(hourHand, hoursDegree);
  hourHand.style.transform = `rotate(${hoursDegree}deg)`;
}

function getTimeDegree(timeUnit, timeUnitPeriod, DEFAULT_DEGREE = 90) {
  // const DEFAULT_DEGREE = 90;
  return (360 / timeUnitPeriod) * timeUnit + DEFAULT_DEGREE;
}

function preventCounterclockwise(element, degree, DEFAULT_DEGREE = 90) {
  // const DEFAULT_DEGREE = 90;
  if (degree === DEFAULT_DEGREE) {
    element.style.transition = `all 0s`;
  } else {
    element.style.transition = `all 0.05s ease-out`;
  }
}

function setDayNightBackground(elements) {
  const now = new Date();
  const hours = now.getHours();
  elements.forEach((element) => {
    if (6 <= hours && hours <= 18) {
      element.classList.add("background-day");
    } else {
      element.classList.add("background-night");
    }
  });
}

// revisedMain();

function revisedMain() {
  const secondHand = document.querySelector(".second-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const hourHand = document.querySelector(".hour-hand");

  let secondsDegree = 0;
  let minutesDegree = 0;
  let hoursDegree = 0;

  initDate();
  setInterval(updateDate, 1000);

  function initDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    // return { seconds, minutes, hours };

    const DEFAULT_DEGREE = 90;
    secondsDegree = (360 / 60) * seconds + DEFAULT_DEGREE;
    minutesDegree = (360 / 60) * minutes + DEFAULT_DEGREE;
    hoursDegree = (360 / 12) * (hours % 12) + DEFAULT_DEGREE;
  }

  function updateDate() {
    secondsDegree += (1 / 60) * 360;
    minutesDegree += (1 / 60 / 60) * 360;
    hoursDegree += 1 / 60 / 60 / 12;

    secondHand.style.transform = `rotate(${secondsDegree}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
    hourHand.style.transform = `rotate(${hoursDegree}deg)`;
  }
}
