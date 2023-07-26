import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
  fields: document.querySelectorAll('.field'),
};
refs.btn.disabled = true;

function timerStyler() {
  refs.input.style.width = 'auto';
  refs.input.style.fontSize = '20px';
  refs.btn.style.fontSize = '18px';
  refs.timer.style.cssText = 'display: flex; gap: 15px; margin-top: 15px;';
  refs.fields.forEach(element => {
    element.querySelector('.value').style.fontSize = '45px';
    element.style.cssText =
      'display: flex; flex-direction: column; align-items: center; font-size: 14px; line-height: 1; text-transform: uppercase; ';
  });
}

timerStyler();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    dateValidator(selectedDates[0]);
  },
};
flatpickr(refs.input, options);

function dateValidator(selectedDate) {
  if (new Date() > selectedDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else refs.btn.disabled = false;
  refs.btn.addEventListener('click', onBtnClick);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onBtnClick() {
  refs.btn.disabled = true;
  refs.input.disabled = true;
  const selectedDate = new Date(refs.input.value);

  const timerInterval = setInterval(() => {
    const timeComponents = convertMs(selectedDate - new Date());

    refs.days.textContent = addLeadingZero(timeComponents.days);
    refs.hours.textContent = addLeadingZero(timeComponents.hours);
    refs.minutes.textContent = addLeadingZero(timeComponents.minutes);
    refs.seconds.textContent = addLeadingZero(timeComponents.seconds);

    if (
      timeComponents.days === 0 &&
      timeComponents.hours === 0 &&
      timeComponents.minutes === 0 &&
      timeComponents.seconds === 0
    ) {
      clearInterval(timerInterval);
      refs.input.disabled = false;
      Notiflix.Notify.success('Сountdown completed!');
    }
  }, 1000);
}
