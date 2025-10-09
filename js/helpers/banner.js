const banner = localStorage.getItem("banner");
if (banner) {
  document.getElementById("banner-novedades").innerHTML = `<strong>📢 Importante:</strong> ${banner}`;
}