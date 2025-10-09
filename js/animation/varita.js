function moverVarita() {
    const varita = document.getElementById("varitaMagica");
    const chispas = varita.querySelector(".chispas");
  
    // Ocultar varita antes de moverla
    varita.style.opacity = "0";
  
    setTimeout(() => {
      // Nueva posición aleatoria
      const x = Math.random() * (window.innerWidth - 120);
      const y = Math.random() * (window.innerHeight - 120);
      varita.style.left = `${x}px`;
      varita.style.top = `${y}px`;
  
      // Mostrar varita
      varita.style.opacity = "1";
  
      // Reiniciar chispas
      chispas.style.opacity = "1";
      chispas.style.transition = "none";
      chispas.style.transform = "scale(1) translateX(0) translateY(0)";
  
      setTimeout(() => {
        chispas.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
        chispas.style.transform = "scale(2) translateX(30px) translateY(-20px)";
        chispas.style.opacity = "0";
      }, 50);
    }, 300); // Espera a que se oculte antes de mover
  }
  
  // Ejecutar cada 4 segundos
setInterval(moverVarita, 4000);
window.addEventListener('cargar', moverVarita);