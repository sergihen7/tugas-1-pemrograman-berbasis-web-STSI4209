export function getAkun() {
  return JSON.parse(localStorage.getItem("pengguna"));
}

export function setAkun(akun) {
  localStorage.setItem("pengguna", JSON.stringify(akun));
}

export function logout() {
  localStorage.removeItem("pengguna");
}
