import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('OnClose - ', selectedDates[0]);
    checkDate(selectedDates[0]);
    startTimer(selectedDates[0]);
  },
};

const refs = {
  startbtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startbtn.setAttribute('disabled', '');

flatpickr('#datetime-picker', options);

function checkDate(iputDate) {
  const date = new Date();
  if (iputDate > date) {
    refs.startbtn.removeAttribute('disabled', '');
  } else {
    console.log('No success');
    refs.startbtn.setAttribute('disabled', '');
    Notiflix.Notify.warning('Please choose a date in the future', 'Message', 'Button Text', {
      width: '360px',
      svgSize: '120px',
    });
  }
}

function startTimer(selectedTime) {
  refs.startbtn.addEventListener('click', () => {
    let timerId = null;

    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      if ((deltaTime < 1000)) {
        clearInterval(timerId);
        console.log('You shall NOT PASS');
      }
      console.log('deltaTime ', deltaTime);
      const timeComp = convertMs(deltaTime);
      refs.daysValue.textContent = String(timeComp.days).padStart(2, "0");
      refs.hoursValue.textContent = String(timeComp.hours).padStart(2, "0");
      refs.minutesValue.textContent = String(timeComp.minutes).padStart(2, "0");
      refs.secondsValue.textContent = String(timeComp.seconds).padStart(2, "0");

      console.log(
        'Days',
        timeComp.days,
        'HRS',
        timeComp.days,
        'MIN',
        timeComp.minutes,
        'SEC',
        timeComp.seconds,
      );
    }, 1000);
  });
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
