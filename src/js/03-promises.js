import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises() {
  event.preventDefault();
  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = form;

  //check if values === '' or 0
  if (!+delay || !+step || !+amount) {
    Notify.warning('pls fill in all filds rigth');
    return;
  }

  for (let i = 0; i < +amount; i += 1) {
    const stepDelay = +delay + +step * i;
    createPromise(i + 1, stepDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', createPromises);