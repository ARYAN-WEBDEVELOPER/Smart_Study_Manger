// Load once
window.userData = JSON.parse(localStorage.getItem("smartStudyUser")) || {};

window.userData.notes = window.userData.notes || [];
window.userData.tasks = window.userData.tasks || [];
