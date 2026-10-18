const STORAGE_KEY = 'pomodoro-minutes';

function loadDuration() {
  const minutes = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isInteger(minutes) && minutes >= 1 && minutes <= 60 ? minutes * 60 : 25 * 60;
}

let DURATION = loadDuration();

const timerEl = document.querySelector('.timer');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');

let remaining = DURATION;
let intervalId = null;

function render() {
  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
  document.title = `${minutes}:${seconds} - Pomodoro`;
}

function startTimer() {
  if (intervalId !== null || remaining === 0) return;
  intervalId = setInterval(() => {
    remaining -= 1;
    render();
    if (remaining === 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = DURATION;
  render();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 다른 탭에서 설정이 바뀌면 즉시 반영
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY) return;
  DURATION = loadDuration();
  resetTimer();
});

const clockEl = document.querySelector('.clock');

function renderClock() {
  clockEl.textContent = new Date().toLocaleTimeString('ko-KR', { hour12: false });
}

render();
renderClock();
setInterval(renderClock, 1000);
