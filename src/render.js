const { ipcRenderer } = require('electron');

const timer = document.querySelector('.timer');
const timerBtn = document.querySelector('.timerBtn');
const startBtn = document.querySelector('.start');
const shortBreak = document.querySelector('.s-break');
const longBreak = document.querySelector('.l-break');
const breakData = document.querySelector('.break-data');
const workData = document.querySelector('.work-data');
const settings = document.querySelector('.settings-btn');

let countDown;
let seconds = 25 * 60;
let type;
let isPaused = true;

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
  timer.textContent = '05:00';
  seconds = 5 * 60;
  type = 'SHORT_BREAK';
  controlTimer();
  resetTimer();
};
const handleLongBreak = () => {
  document.body.classList.add('long');
  document.body.classList.remove('short');
  timer.textContent = '15:00';
  seconds = 15 * 60;
  type = 'LONG_BREAK';
  controlTimer();
  resetTimer();
};
const handleTimer = () => {
  document.body.className = '';
  timer.textContent = '25:00';
  seconds = 25 * 60;
  type = 'WORK';
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
        ipcRenderer.send('notification', 'Your timer has finished.');
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

shortBreak.addEventListener('click', handleShortBreak);
longBreak.addEventListener('click', handleLongBreak);
timerBtn.addEventListener('click', handleTimer);
startBtn.addEventListener('click', controlTimer);
