import "./popup.css";

document.querySelectorAll(".popup-toggle").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const popup = el.getAttribute("data-popup");
    document.getElementById(popup).classList.add("active");
  });
});

document.querySelectorAll(".popup .close-button").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const popup = el.closest(".popup");
    popup.classList.remove("active");
  });
});

document.querySelectorAll(".popup .overlay").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const popup = el.closest(".popup");
    popup.classList.remove("active");
  });
});
