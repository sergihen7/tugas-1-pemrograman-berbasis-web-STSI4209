import "../js/main.js";
import "../css/dashboard.css";
import { getAkun } from "../js/akun.js";
import Swal from "sweetalert2";
import { dataBahanAjar, dataTracking } from "../js/data.js";
import { initPopup } from "../component/popup.js";

document
  .querySelectorAll("#username")
  .forEach((el) => (el.innerHTML = getAkun().nama));

document.querySelectorAll("#greeting").forEach((el) => {
  const jam = new Date().getHours();
  if (jam >= 5 && jam < 10) {
    el.innerHTML = "Selamat Pagi";
  } else if (jam >= 10 && jam < 15) {
    el.innerHTML = "Selamat Siang";
  } else if (jam >= 15 && jam < 18) {
    el.innerHTML = "Selamat Sore";
  } else {
    el.innerHTML = "Selamat Malam";
  }
});

document.querySelectorAll("#logout").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Logout Berhasil",
      text: "Selamat Tinggal",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      localStorage.removeItem("pengguna");
      window.location.href = "/login.html";
    });
  });
});

/**
 * Tracker
 */

if (document.getElementById("track-id")) {
  document.getElementById("track").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    window.location.href = `/tracking.html?no_do=${form.get("track-id")}`;
  });

  if (window.location.search) {
    const no_do = new URLSearchParams(window.location.search).get("no_do");

    document.getElementById("track-id").value = no_do;

    const data = dataTracking[parseInt(no_do)];

    if (!data) {
      document.getElementById("track-card").innerHTML = /* html */ `
        <div class="card">
          <h2>No. Biling Tidak Ditemukan</h2>
        </div>
      `;
    } else {
      document.getElementById("track-card").innerHTML = /* html */ `
        <div class="card">
          <div class="card-header">
            <h2>${data.nama}</h2>
            <h6>${data.tanggalKirim}</h6>
          </div>
          <div class="card-body">
            <h6>${data.nomorDO}</h6>
            <h4>Ekspedisi: ${data.ekspedisi}</h4>
            <h4>${data.total}</h4>
          </div>
          <h4 id="track-status">${data.status}</h4>
        </div>

        <div id="track-detail">
          <h4>Detail Perjalanan</h4>
        </div>
      `;

      // order by waktu
      data.perjalanan = data.perjalanan.sort((a, b) => {
        return new Date(b.waktu) - new Date(a.waktu);
      });

      data.perjalanan.forEach((el) => {
        document.querySelector("#track-detail").innerHTML += /* html */ `
          <div class="track-item">
            <div class="track-dot">
              <span class="dot"></span>
              <span class="line"></span>
            </div>
            <div class="track-content">
              <h6>${el.keterangan}</h6>
              <p>${el.waktu}</p>
            </div>
          </div>
        `;
      });
    }
  }
}

/**
 * Stock Book
 * */

if (document.getElementById("book-list")) {
  dataBahanAjar.forEach((el) => {
    document.getElementById("book-list").innerHTML += /* html */ `
      <div
        class="book popup-toggle"
        data-popup="popup-book-${el.kodeBarang}"
      >
        <img
          class="cover"
          onerror="if (this.src != 'https://dummyimage.com/300x400/bfbfbf/ffffff.jpg&text=Placeholder+Image') this.src = 'https://dummyimage.com/300x400/bfbfbf/ffffff.jpg&text=Placeholder+Image';"
          src="${el.cover}"
          alt="${el.namaBarang}"
        />
        <div class="book-info">
          <h4>${el.namaBarang} (${el.kodeBarang})</h4>
        </div>
      </div>

      <div class="popup" id="popup-book-${el.kodeBarang}">
        <div class="overlay"></div>
        <div class="popup-content">
          <div class="close-button">
            <i class="bi bi-x-lg"></i>
          </div>
          <h2>${el.namaBarang}</h2>
          <img class="popup-book-cover"  onerror="if (this.src != 'https://dummyimage.com/300x400/bfbfbf/ffffff.jpg&text=Placeholder+Image') this.src = 'https://dummyimage.com/300x400/bfbfbf/ffffff.jpg&text=Placeholder+Image';"
          src="${el.cover}"
          alt="${el.namaBarang}"/>
          <p>Kode Barang: ${el.kodeBarang}</p>
          <p>Lokasi: ${el.kodeLokasi}</p>
          <p>Stok: ${el.stok}</p>
        </div>
      </div>
    `;
  });

  initPopup();
}
