const STORAGE_KEY = 'pomodoro-minutes';
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const input = document.querySelector('#timer-minutes');
const saveBtn = document.querySelector('.btn-save');

function isValid() {
  const value = input.value.trim();
  if (value === '') return false;
  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function updateSaveButton() {
  saveBtn.disabled = !isValid();
}

function loadSaved() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  input.value = Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES
    ? saved
    : DEFAULT_MINUTES;
}

function save() {
  if (!isValid()) return;
  localStorage.setItem(STORAGE_KEY, String(Number(input.value)));
  saveBtn.textContent = '저장됨';
  setTimeout(() => { saveBtn.textContent = '저장'; }, 1000);
}

input.addEventListener('input', updateSaveButton);
saveBtn.addEventListener('click', save);

loadSaved();
updateSaveButton();
