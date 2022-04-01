import Notiflix from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const firstDelay = event.currentTarget.elements.delay.value;
  const step = event.currentTarget.elements.step.value;
  const amount = event.currentTarget.elements.amount.value;

  let delayValue = firstDelay * 1;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '360px',
          svgSize: '120px',
        });
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '360px',
          svgSize: '120px',
        });
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue = delayValue + step * 1;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
