const refs = {
  startBtn: document.querySelector('[data-start]'),
  closeBtn: document.querySelector('[data-stop]'),
  bodyTag: document.querySelector('body'),
};

let timerId = null;
refs.closeBtn.setAttribute('disabled', '');

console.log(refs.startBtn);
console.log(refs.closeBtn);
console.log(refs.bodyTag);

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    changeBG();
  }, 1000);
  refs.startBtn.setAttribute('disabled', '');
  refs.closeBtn.removeAttribute('disabled');
});

function changeBG() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.closeBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  refs.startBtn.removeAttribute('disabled');
  refs.closeBtn.setAttribute('disabled', '');
});

//
