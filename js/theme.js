const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  }
});
