// LOGIN LOGIC

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    if (username === "") return;

    const userData = {
      username: username,
      tasks: [],
      notes: [],
      studyTime: 0,
      completedTasks: 0
    };

    localStorage.setItem("smartStudyUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "dashboard.html";
  });
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

// PROTECT DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}
