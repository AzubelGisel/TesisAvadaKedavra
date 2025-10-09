
// Filtro por casa
document.querySelectorAll('.filtro-casa').forEach(boton => {
  boton.addEventListener('click', () => {
    const casa = boton.dataset.casa;
    document.querySelectorAll('.producto').forEach(prod => {
      prod.style.display = (casa === 'todos' || prod.dataset.casa === casa) ? 'block' : 'none';
    });
  });
});

// Añadir al caldero
document.querySelectorAll('.add-to-cart').forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.closest('.card-product').querySelector('[data-nombre]').dataset.nombre;
    alert(`🪄 ${nombre} fue añadido al caldero con éxito`);
  });
});
