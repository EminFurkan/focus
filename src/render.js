const timer = document.querySelector('.timer');
const timerBtn = document.querySelector('.timerBtn');
const start = document.querySelector('.start');
const shortBreak = document.querySelector('.s-break');
const longBreak = document.querySelector('.l-break');
const breakData = document.querySelector('.break-data');
const workData = document.querySelector('.work-data');

let countDown;
let seconds = 25 * 60;
let type;

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
  setTimer();
  clearInterval(countDown);
};
const handleLongBreak = () => {
  document.body.classList.add('long');
  document.body.classList.remove('short');
  timer.textContent = '15:00';
  seconds = 15 * 60;
  type = 'LONG_BREAK';
  setTimer();
  clearInterval(countDown);
};
const handleTimer = () => {
  document.body.className = '';
  timer.textContent = '25:00';
  seconds = 25 * 60;
  type = 'WORK';
  setTimer();
  clearInterval(countDown);
};

const setTimer = () => {
  const now = Date.now();
  const then = now + seconds * 1000;
  clearInterval(countDown);

  countDown = setInterval(() => {
    const timeLeft = Math.round((then - Date.now()) / 1000);
    if (timeLeft < 1) {
      clearInterval(countDown);
      setData(seconds, type);
      displayData();
    }
    displayTime(timeLeft);
  }, 1000);
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
start.addEventListener('click', setTimer);
