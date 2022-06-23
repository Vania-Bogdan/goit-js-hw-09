const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const frequency = 1000; //ms

buttonStart.addEventListener('click', loopChangingColor);
buttonStop.toggleAttribute('disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changingColor() {
  console.log('color changed');
  document.body.style.backgroundColor = getRandomHexColor();
}

function loopChangingColor() {
  console.log('start');
  buttonStart.toggleAttribute('disabled');
  buttonStop.toggleAttribute('disabled');
  const timerId = setInterval(() => {
    changingColor();
  }, frequency);
  buttonStop.addEventListener('click', stopChanginColor(timerId), { once: true });
}


function stopChanginColor(timerId) {
  return function () {
    console.log('end');
    buttonStart.toggleAttribute('disabled');
    buttonStop.toggleAttribute('disabled');
    clearInterval(timerId);
  };
}

// startBtn.style.background = "#00D13B"
// stopBtn.style.background = "#D13B00"
// resetBtn.style.background = "#3B00D1"