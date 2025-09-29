let carrito = (JSON.parse(localStorage.getItem("carrito")) || []).map(p => ({
  ...p,
  cantidad: p.cantidad ?? 1
}));

const lista = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

function renderizarCarrito() {
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "carrito-item";

    item.innerHTML = `
      <div>
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio.toFixed(2)} x ${producto.cantidad} = <strong>$${subtotal.toFixed(2)}</strong></p>
      </div>
      <div class="carrito-controles d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary" onclick="restar(${index})">➖</button>
        <span class="cantidad-box mx-1">${producto.cantidad}</span>
        <button class="btn btn-sm btn-outline-primary" onclick="sumar(${index})">➕</button>
        <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminar(${index})">🗑️</button>
      </div>
    `;

    lista.appendChild(item);
  });

  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function sumar(index) {
  carrito[index].cantidad += 1;
  guardarYActualizar();
}

function restar(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad -= 1;
  } else {
    carrito.splice(index, 1);
  }
  guardarYActualizar();
}

function eliminar(index) {
  carrito.splice(index, 1);
  guardarYActualizar();
}

function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

renderizarCarrito();

document.getElementById("continuarCompra").addEventListener("click", () => {
  const boton = document.getElementById("continuarCompra");
  boton.classList.add("animado");

  setTimeout(() => {
    boton.classList.remove("animado");
    window.location.href = "envio.html";
  }, 600);
});
