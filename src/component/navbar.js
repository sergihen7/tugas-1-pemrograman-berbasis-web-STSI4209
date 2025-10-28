import "./navbar.css";

document.querySelectorAll(".menu-toggle").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector(".nav-list").classList.toggle("active");
  });
});
