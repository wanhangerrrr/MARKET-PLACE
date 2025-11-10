document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const content = document.querySelector(".dropdown-content");

  dropdown.addEventListener("mouseenter", () => {
    content.style.display = "flex";
  });

  dropdown.addEventListener("mouseleave", () => {
    content.style.display = "none";
  });
});
