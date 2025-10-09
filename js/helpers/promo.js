const promo = JSON.parse(localStorage.getItem("promo"));
if (promo) {
  document.getElementById("promo-destacada").innerHTML = `
    <strong>🎁 ${promo.titulo}</strong><br>
    ${promo.descripcion}<br>
    <em>Válida del ${promo.inicio} al ${promo.fin}</em>
  `;
}