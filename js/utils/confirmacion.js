
window.addEventListener("load", () => {
  // Recupera los productos guardados en localStorage
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];

  // Recupera el tipo de envío guardado
  const envio = localStorage.getItem("envio_tipo") || "No especificado";

  // Recupera el total final guardado
  const total = localStorage.getItem("envio_total") || "0";

  // Recupera el estado del modo debug
  const modoDebug = localStorage.getItem("modo_debug") === "true";

  // Muestra los productos en la lista
  const lista = document.getElementById("listaProductos");
  productos.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `🪄 ${p.nombre} - $${p.precio}`;
    lista.appendChild(li);
  });

  // Muestra tipo de envío y total
  document.getElementById("tipoEnvio").textContent = envio;
  document.getElementById("totalFinal").textContent = `$${total}`;

  // Muestra los datos del comprador en lista
  const campos = ["nombre", "direccion", "ciudad", "codigoPostal", "email", "telefono"];
  const listaDatos = document.getElementById("datosComprador");
  campos.forEach(id => {
    const valor = localStorage.getItem("envio_" + id);
    if (valor) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<strong>${id}:</strong> ${valor}`;
      listaDatos.appendChild(li);
    }
  });

  // Si el modo debug estaba activado, muestra datos en consola
  if (modoDebug) {
    console.log("🧪 Modo debug activo en confirmación");
    console.log("Productos:", productos);
    console.log("Envío:", envio);
    console.log("Total:", total);
  }

  // Limpieza final del localStorage
  localStorage.clear();
});
