userData.studyTime = userData.studyTime || 0;
userData.sessions++;
userData.studyTime += 25;

localStorage.setItem("smartStudyUser", JSON.stringify(userData));

if (window.updateProgress) updateProgress();


let studyTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = studyTime;
let isStudy = true;
let timer = null;

const timerDisplay = document.getElementById("timerDisplay");
const timerLabel = document.getElementById("timerLabel");
const sessionsEl = document.getElementById("sessions");
const totalTimeEl = document.getElementById("totalTime");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// INITIAL DATA
userData.sessions = userData.sessions || 0;
userData.studyTime = userData.studyTime || 0;

sessionsEl.textContent = userData.sessions;
totalTimeEl.textContent = userData.studyTime;

// FORMAT TIME
function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

// UPDATE DISPLAY
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

// START TIMER
startBtn.addEventListener("click", () => {
  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

      if (isStudy) {
        userData.sessions++;
        userData.studyTime += 25;
        saveData();

        sessionsEl.textContent = userData.sessions;
        totalTimeEl.textContent = userData.studyTime;

        isStudy = false;
        timerLabel.textContent = "Break Time";
        timeLeft = breakTime;
      } else {
        isStudy = true;
        timerLabel.textContent = "Study Time";
        timeLeft = studyTime;
      }

      updateDisplay();
    }
  }, 1000);
});

// PAUSE
pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// RESET
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  isStudy = true;
  timeLeft = studyTime;
  timerLabel.textContent = "Study Time";
  updateDisplay();
});

// SAVE DATA
function saveData() {
  localStorage.setItem("smartStudyUser", JSON.stringify(userData));
}

// INIT
updateDisplay();
