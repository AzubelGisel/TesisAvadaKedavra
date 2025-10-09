window.addEventListener('DOMContentLoaded', () => {
  const novedades = localStorage.getItem("bannerNovedades");
  const promo = localStorage.getItem("promoDestacada");

  const novedadesEl = document.getElementById("banner-novedades");
  const promoEl = document.getElementById("promo-destacada");

  if (novedades && novedadesEl) {
    novedadesEl.innerHTML = `<strong>📢 Importante:</strong> ${novedades}`;
  }

  if (promo && promoEl) {
    promoEl.textContent = promo;
  }
});
