
document.getElementById('btn-arriba').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btn-atras').addEventListener('click', () => {
  window.history.back();
});
