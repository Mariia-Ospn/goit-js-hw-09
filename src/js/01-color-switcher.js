const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let interval = null;
let isActive = false;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {
  isActive = true;
  setBtnDisabledState(isActive);
  interval = setInterval(() => {
    setBackgroundColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  if (isActive) {
    isActive = false;
    setBtnDisabledState(isActive);
    clearInterval(interval);
  }
});

function setBtnDisabledState(active) {
  refs.startBtn.disabled = active;
  refs.stopBtn.disabled = !active;
}

function setBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
