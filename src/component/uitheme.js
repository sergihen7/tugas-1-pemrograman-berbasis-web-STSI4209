import "./uitheme.css";

const toggleBtn = document.querySelectorAll("#uitheme");
const body = document.body;

const savedTheme = localStorage.getItem("uitheme");
if (savedTheme) {
  body.className = savedTheme;
}

if (toggleBtn.length > 0) {
  toggleBtn.forEach((el) => {
    el.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark") ? "light" : "dark";
      body.className = newTheme;
      localStorage.setItem("uitheme", newTheme); // simpan preferensi

      el.innerHTML =
        newTheme === "light"
          ? `<i class="bi bi-sun"></i>`
          : `<i class="bi bi-moon-fill"></i>`;
    });

    el.innerHTML =
      body.className === "light"
        ? `<i class="bi bi-sun"></i>`
        : `<i class="bi bi-moon-fill"></i>`;

    el.classList.add("uitheme");
  });
}
