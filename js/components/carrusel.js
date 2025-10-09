// js/components/carrusel.js
function carrusel() {
  const track   = document.querySelector('.carrusel-track');
  const prevBtn = document.querySelector('.carrusel-btn.prev');
  const nextBtn = document.querySelector('.carrusel-btn.next');
  const container = document.querySelector('.carrusel-container');
  if (!track || !prevBtn || !nextBtn || !container) return;

  const itemWidth = 270;
  let scrollAmount = 0;
  const max = () => track.scrollWidth - container.offsetWidth;

  function update() {
    prevBtn.disabled = scrollAmount <= 0;
    nextBtn.disabled = scrollAmount >= max();
  }

  nextBtn.addEventListener('click', () => {
    scrollAmount = Math.min(scrollAmount + itemWidth, max());
    track.style.transform = `translateX(-${scrollAmount}px)`;
    update();
  });

  prevBtn.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - itemWidth, 0);
    track.style.transform = `translateX(-${scrollAmount}px)`;
    update();
  });

  update();
  window.addEventListener('resize', update);
}

carrusel();  