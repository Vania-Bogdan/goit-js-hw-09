import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('[data-start]');
const buttonReset = document.querySelector('[data-reset]');
const inputDate = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.checkDate(selectedDates[0]);
  },
};

const timer = {
  frequency: 1000, //ms
  chooseDate: undefined,
  indexForStoppingTimer: undefined,
  clockFace: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  init() {
    inputDate.setAttribute('disabled', '');
    buttonStart.setAttribute('disabled', '');
    buttonReset.removeAttribute('disabled');
    this.indexForStoppingTimer = setInterval(this.renderTimer.bind(this), this.frequency);
  },

  resetTimer() {
    //stop setInterval
    clearInterval(this.indexForStoppingTimer);
    //set 00:00:00:00 for clockFace
    for (const key in this.clockFace) {
      this.clockFace[key].innerHTML = '00';
    }
    //clear input value
    calendar.clear();
    
    inputDate.removeAttribute('disabled');
    buttonReset.setAttribute('disabled', '');
  },

  renderTimer() {
    //calculate
    const dateNow = Date.now();
    const msRemaining = this.chooseDate - dateNow;
    if (msRemaining <= 0) {
      this.resetTimer();
      return;
    }
    const timeRemaining = convertMs(msRemaining);
    //render
    for (const key in this.clockFace) {
      const value = addLeadingZero(timeRemaining[key] + '');
      this.clockFace[key].innerHTML = value;
    }
  },

  checkDate(selectedDate) {
    const chooseDate = Date.parse(selectedDate);
    const dateNow = Date.now();
    if (chooseDate <= dateNow) {
      //error
      Notify.warning('Please choose a date in the future');
      calendar.open();
      buttonStart.setAttribute('disabled', '');
    } else {
      //allow using timer
      Notify.info('Nice choose! :)');
      buttonStart.removeAttribute('disabled', '');

      this.chooseDate = chooseDate;
    }
  },
};

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

function addLeadingZero(value) {
  return value.padStart(2, 0);
}

buttonStart.addEventListener('click', timer.init.bind(timer));
buttonReset.addEventListener('click', timer.resetTimer.bind(timer));
buttonStart.setAttribute('disabled', '');
buttonReset.setAttribute('disabled', '');
const calendar = flatpickr('#datetime-picker', options);