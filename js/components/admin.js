// js/components/admin.js
// Seguridad y sesión
function validarAdmin() {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  if (user === 'admin' && pass === 'alohomora5') {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    mostrarSeccion('productos');
    renderProductos();
    mostrarEstadisticas();
    mostrarVisitasPorDia();
    iniciarInactividad();
  } else {
    alert("Credenciales incorrectas.");
  }
}

function cerrarSesion() {
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('admin-login').style.display = 'block';
}

function mostrarSeccion(id) {
  document.querySelectorAll('.panel-seccion').forEach(div => div.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Productos
let productos = [
  { id: 1, nombre: "Varita de Saúco", precio: 39.99, stock: 5 },
  { id: 2, nombre: "Bufanda de Gryffindor", precio: 24.99, stock: 12 }
];

function renderProductos() {
  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';
  productos.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>Stock: ${p.stock}</td>
      <td>
        <button onclick="editarProducto(${p.id})">Editar</button>
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function agregarProducto() {
  const nombre = prompt("Nombre del producto:");
  const precio = parseFloat(prompt("Precio:"));
  const stock = parseInt(prompt("Stock inicial:"));
  if (!nombre || isNaN(precio) || isNaN(stock)) return;
  const nuevo = { id: Date.now(), nombre, precio, stock };
  productos.push(nuevo);
  renderProductos();
}

function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
  const nuevoPrecio = parseFloat(prompt("Nuevo precio:", producto.precio));
  const nuevoStock = parseInt(prompt("Nuevo stock:", producto.stock));
  if (!nuevoNombre || isNaN(nuevoPrecio) || isNaN(nuevoStock)) return;
  producto.nombre = nuevoNombre;
  producto.precio = nuevoPrecio;
  producto.stock = nuevoStock;
  renderProductos();
}

function eliminarProducto(id) {
  if (confirm("¿Eliminar este producto?")) {
    productos = productos.filter(p => p.id !== id);
    renderProductos();
  }
}

function filtrarProductos() {
  const filtro = document.getElementById('buscadorProductos').value.toLowerCase();
  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';
  productos
    .filter(p => p.nombre.toLowerCase().includes(filtro))
    .forEach(p => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>Stock: ${p.stock}</td>
        <td>
          <button onclick="editarProducto(${p.id})">Editar</button>
          <button onclick="eliminarProducto(${p.id})">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
}

// Promos
function guardarPromo() {
  const promo = document.getElementById("promoTexto").value;
  localStorage.setItem("promoDestacada", promo);
  alert("Promoción guardada.");
}

// Banner
function guardarBanner() {
  const banner = document.getElementById("bannerTexto").value;
  localStorage.setItem("bannerNovedades", banner);
  alert("Banner guardado.");
}

// Estadísticas
const productosVendidos = [
  { nombre: "Túnica", cantidad: 12 },
  { nombre: "Varita", cantidad: 9 }
];

function mostrarEstadisticas() {
  const lista = document.getElementById('topVentas');
  lista.innerHTML = '';
  productosVendidos.forEach(p => {
    const item = document.createElement('li');
    item.textContent = `${p.nombre} - ${p.cantidad} ventas`;
    lista.appendChild(item);
  });
}

function mostrarVisitasPorDia() {
  const visitas = JSON.parse(localStorage.getItem("visitasPorDia")) || {};
  const contenedor = document.getElementById("contadorVisitas");
  contenedor.innerHTML = "<h4>Visitas por día:</h4>";
  for (const fecha in visitas) {
    contenedor.innerHTML += `<p>${fecha}: ${visitas[fecha]}</p>`;
  }
}

// Bloqueo por inactividad
let tiempoInactivo;
function iniciarInactividad() {
  document.addEventListener("mousemove", reiniciarInactividad);
  document.addEventListener("keydown", reiniciarInactividad);
  reiniciarInactividad();
}
function reiniciarInactividad() {
  clearTimeout(tiempoInactivo);
  tiempoInactivo = setTimeout(() => {
    alert("Sesión cerrada por inactividad.");
    cerrarSesion();
  }, 300000); // 5 minutos
}
