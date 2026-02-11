// USE GLOBAL DATA (DO NOT DECLARE AGAIN)
const userData = window.userData;
if (window.updateProgress) updateProgress();

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");

// RENDER TASKS
function renderTasks() {
  taskList.innerHTML = "";

  userData.tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span>${task.name}</span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  saveData();
}

// ADD TASK
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (!taskName) return;

  userData.tasks.push({
    name: taskName,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
});

// TOGGLE COMPLETE
function toggleTask(index) {
  userData.tasks[index].completed = !userData.tasks[index].completed;
  renderTasks();
}

// DELETE TASK
function deleteTask(index) {
  userData.tasks.splice(index, 1);
  renderTasks();
}

// UPDATE STATS
function updateStats() {
  totalTasksEl.textContent = userData.tasks.length;
  completedTasksEl.textContent = userData.tasks.filter(t => t.completed).length;
}

// SAVE TO LOCALSTORAGE
function saveData() {
  localStorage.setItem("smartStudyUser", JSON.stringify(userData));
}

// INITIAL LOAD
renderTasks();
