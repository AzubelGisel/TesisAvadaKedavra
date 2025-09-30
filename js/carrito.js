let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");

  if (!lista || !totalCarrito) return;

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

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();

  const botonContinuar = document.getElementById("continuarCompra");
  if (botonContinuar) {
    botonContinuar.addEventListener("click", () => {
      botonContinuar.classList.add("animado");
      setTimeout(() => {
        botonContinuar.classList.remove("animado");
        window.location.href = "envio.html";
      }, 600);
    });
  }

  document.querySelectorAll(".add-to-cart").forEach(boton => {
    boton.addEventListener("click", () => {
      const card = boton.closest(".card-product");
      if (!card) return;

      const producto = {
        id: boton.dataset.id,
        nombre: card.querySelector("[data-nombre]").textContent,
        descripcion: card.querySelector("[data-descripcion]").textContent,
        precio: parseFloat(card.querySelector("[data-precio]").textContent.replace("$", "").replace(".", "").replace(",", ".")),
        cantidad: 1
      };

      const existente = carrito.find(p => p.id === producto.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push(producto);
      }

      guardarYActualizar();
      alert(`🛒 Añadido: ${producto.nombre}`);
    });
  });
});
