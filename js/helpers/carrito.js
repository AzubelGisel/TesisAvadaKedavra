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


document.addEventListener("DOMContentLoaded", () => {
  // 🛒 Carrito
  const productos = [
    { id: 1, nombre: "Túnica de Gryffindor", precio: 49.99 },
    { id: 2, nombre: "Bufanda de Slytherin", precio: 29.99 },
    { id: 3, nombre: "Varita de Ravenclaw", precio: 34.99 },
    { id: 4, nombre: "Pin de Hufflepuff", precio: 12.99 }
  ];

  let carrito = (JSON.parse(localStorage.getItem("carrito")) || []).map(p => ({
    ...p,
    cantidad: p.cantidad ?? 1
  }));
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    contador.textContent = total;
  }

  window.agregarAlCarrito = function(idProducto) {
    const productoSeleccionado = productos.find(p => p.id === idProducto);
    const index = carrito.findIndex(p => p.id === idProducto);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    if (contador) {
      const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
      contador.textContent = total;
    }

    alert(`Se agregó "${productoSeleccionado.nombre}" al carrito.`);
    console.log("Carrito actual:", carrito);
    mostrarCarrito?.();
  };

  window.mostrarCarrito = function() {
    const lista = document.getElementById("lista-carrito");
    if (!lista) return;
    lista.innerHTML = "";

    carrito.forEach(producto => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
      lista.appendChild(item);
    });
  };

  // 🧠 Cierre de menú hamburguesa
  const navbarCollapse = document.getElementById("navCollapse");
  const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // 🎩 Sombrero Seleccionador
  document.getElementById('calcBtn')?.addEventListener('click', function(){
    const form = document.getElementById('houseQuiz');
    const q1 = form.q1?.value;
    const q2 = form.q2?.value;
    const q3 = form.q3?.value;

    if(!q1 || !q2 || !q3){
      alert('Por favor respondé todas las preguntas.');
      return;
    }

    const tally = {Gryffindor:0, Hufflepuff:0, Ravenclaw:0, Slytherin:0};
    [q1,q2,q3].forEach(v => { if(tally[v] !== undefined) tally[v]++; });

    const order = ['Gryffindor','Hufflepuff','Ravenclaw','Slytherin'];
    let result = order[0], max = -1;
    for(const h of order){ if(tally[h] > max){ max = tally[h]; result = h; } }

    const casas = {
      Gryffindor: {
        escudo: '🦁',
        frase: 'Donde habitan los valientes. Tu coraje te guiará.',
        clase: 'gryffindor-bg'
      },
      Hufflepuff: {
        escudo: '🦡',
        frase: 'La casa de los justos y leales. Tu corazón es tu fuerza.',
        clase: 'hufflepuff-bg'
      },
      Ravenclaw: {
        escudo: '🦅',
        frase: 'Donde la mente encuentra su vuelo. Tu sabiduría ilumina el camino.',
        clase: 'ravenclaw-bg'
      },
      Slytherin: {
        escudo: '🐍',
        frase: 'El poder de la ambición. Tu astucia te llevará lejos.',
        clase: 'slytherin-bg'
      }
    };

    const data = casas[result];
    document.getElementById('escudoCasa').innerText = data.escudo;
    document.getElementById('nombreCasa').innerText = result;
    document.getElementById('fraseCasa').innerText = data.frase;

    const modalContent = document.getElementById('modalCartaContent');
    modalContent.className = 'modal-content ' + data.clase;

    const modal = new bootstrap.Modal(document.getElementById('cartaCasaModal'));
    modal.show();
  });
});