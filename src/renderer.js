const timer = document.querySelector('.timer');
const timerBtn = document.querySelector('.timerBtn');
const startBtn = document.querySelector('.start');
const shortBreak = document.querySelector('.s-break');
const longBreak = document.querySelector('.l-break');
const breakData = document.querySelector('.break-data');
const workData = document.querySelector('.work-data');
const settingsBtn = document.querySelector('.settings-btn');
const timerSettings = document.querySelector('.timer-settings');
const shortBreakValue = document.querySelector('.short-break-label');
const workValue = document.querySelector('.work-label');
const longBreakValue = document.querySelector('.long-break-label');

let countDown;
let type;
let isPaused = false;

let userPreference = {
  work: 25,
  shortBreak: 5,
  longBreak: 15
};

let seconds;

const data = {
  totalMins: 0,
  totalBreaks: 0
};

const setData = (mins, type) => {
  switch (type) {
    case 'WORK':
      return (data.totalMins += mins);
    case 'SHORT_BREAK':
      return (data.totalBreaks += 5);
    case 'LONG_BREAK':
      return (data.totalBreaks += 15);
    default:
      return data;
  }
};

displayData = () => {
  workData.textContent = data.totalMins;
  breakData.textContent = data.totalBreaks;
};

const handleShortBreak = () => {
  document.body.classList.add('short');
  document.body.classList.remove('long');
  seconds = userPreference.shortBreak * 60;
  type = 'SHORT_BREAK';
  timer.textContent = `${userPreference.shortBreak < 10 ? '0' : ''}${
    userPreference.shortBreak
  }:00`;
  controlTimer();
  resetTimer();
};
const handleLongBreak = () => {
  document.body.classList.add('long');
  document.body.classList.remove('short');
  seconds = userPreference.longBreak * 60;
  type = 'LONG_BREAK';
  timer.textContent = `${userPreference.longBreak}:00`;
  controlTimer();
  resetTimer();
};
const handleTimer = () => {
  document.body.className = '';
  seconds = userPreference.work * 60;
  type = 'WORK';
  timer.textContent = `${userPreference.work}:00`;
  controlTimer();
  resetTimer();
};

const controlTimer = () => {
  const now = Date.now();
  const then = now + seconds * 1000;
  isPaused = !isPaused;

  if (!isPaused) {
    startBtn.textContent = 'Stop';
    countDown = setInterval(() => {
      const timeLeft = Math.round((then - Date.now()) / 1000);
      if (timeLeft < 1) {
        clearInterval(countDown);
        setData(seconds, type);
        displayData();

        let msg;
        type.length > 4 ? (msg = 'Time for a break!') : (msg = 'Back to work!');

        new window.Notification('Focus', {
          body: msg
        });
      }
      displayTime(timeLeft);
    }, 1000);
  } else {
    resetTimer();
  }
};

const resetTimer = () => {
  clearInterval(countDown);
  startBtn.textContent = 'Start';
};

const displayTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const remainer = seconds % 60;
  timer.textContent = `${mins < 10 ? '0' : ''}${mins}:${
    remainer < 10 ? '0' : ''
  }${remainer}`;
};

const onChange = (
  e,
  type = e.target.className,
  value = Number(e.target.value)
) => {
  switch (type) {
    case 'work':
      return (
        (workValue.textContent = `${value} mins`),
        (userPreference.work = value),
        (timer.textContent = `${userPreference.work}:00`)
      );
    case 'short':
      return (
        (shortBreakValue.textContent = `${value} mins`),
        (userPreference.shortBreak = value),
        (timer.textContent = `${userPreference.shortBreak}:00`)
      );
    case 'long':
      return (
        (longBreakValue.textContent = `${value} mins`),
        (userPreference.longBreak = value),
        (timer.textContent = `${userPreference.longBreak}:00`)
      );
    default:
      return e.target.value;
  }
};

shortBreak.addEventListener('click', handleShortBreak);
longBreak.addEventListener('click', handleLongBreak);
timerBtn.addEventListener('click', handleTimer);
startBtn.addEventListener('click', controlTimer);
settingsBtn.addEventListener('click', () =>
  timerSettings.classList.toggle('on')
);
timerSettings.addEventListener('change', onChange);
timerBtn.click();
