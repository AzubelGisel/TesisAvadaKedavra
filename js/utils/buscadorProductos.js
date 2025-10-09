document.getElementById('buscador').addEventListener('input', function () {
    const termino = this.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
      const texto = producto.textContent.toLowerCase();
      producto.style.display = texto.includes(termino) ? 'block' : 'none';
    });
  });