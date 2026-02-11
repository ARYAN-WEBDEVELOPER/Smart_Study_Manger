const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

navItems.forEach(item => {
  item.addEventListener("click", () => {

    // Remove active from all nav items
    navItems.forEach(nav => nav.classList.remove("active"));

    // Hide all sections
    sections.forEach(sec => sec.classList.remove("active-section"));

    // Activate clicked nav
    item.classList.add("active");

    // Show selected section
    const sectionId = item.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active-section");
  });
});
