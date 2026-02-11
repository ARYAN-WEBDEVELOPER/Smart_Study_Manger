(() => {

  userData.tasks = userData.tasks || [];
  userData.sessions = userData.sessions || 0;
  userData.studyTime = userData.studyTime || 0;

  const totalTasksEl = document.getElementById("totalTasksProg");
  const completedTasksEl = document.getElementById("completedTasksProg");
  const sessionsEl = document.getElementById("sessionsProg");
  const studyTimeEl = document.getElementById("studyTimeProg");
  const progressFill = document.getElementById("progressFill");
  const progressPercentEl = document.getElementById("progressPercent");

   window.updateProgress = function () {

    const totalTasks = userData.tasks.length;
    const completedTasks = userData.tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = totalTasks;
    completedTasksEl.textContent = completedTasks;
    sessionsEl.textContent = userData.sessions;
    studyTimeEl.textContent = userData.studyTime;

    const percent = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    progressFill.style.width = percent + "%";
    progressPercentEl.textContent = percent + "%";
  }

  updateProgress();

})();
