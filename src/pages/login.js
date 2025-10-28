import Swal from "sweetalert2";
import "../css/login.css";
import { dataPengguna } from "../js/data.js";
import "../js/main.js";
import { setAkun } from "../js/akun.js";

document.getElementById("login").addEventListener("submit", (e) => {
  const form = new FormData(e.target);

  e.preventDefault();
  const pengguna = dataPengguna.find((el) => {
    if (el.email === form.get("email") && el.password === form.get("password"))
      return dataPengguna;
  });

  if (pengguna) {
    setAkun(pengguna);
    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: "Selamat datang di Tracking Bahan Ajar",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = "/dashboard.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email atau password salah!",
    });
  }
});
