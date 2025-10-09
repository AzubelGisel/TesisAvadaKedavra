
window.addEventListener("load", () => {
  const metodo = document.getElementById("metodo");
  const formularioEspecifico = document.getElementById("formularioEspecifico");
  const btn = document.getElementById("confirmarPago");
  const resumen = document.getElementById("resumenCompra");
  const detalleProductos = document.getElementById("detalleProductos");
  const detalleEnvio = document.getElementById("detalleEnvio");
  const totalFinal = document.getElementById("totalFinal");
  const datosComprador = document.getElementById("datosComprador");

  metodo.addEventListener("change", () => {
    const tipo = metodo.value;
    formularioEspecifico.innerHTML = "";

    if (tipo === "tarjeta") {
      formularioEspecifico.innerHTML = `
        <div class="mb-3">
          <label for="tarjeta" class="form-label">Número de tarjeta</label>
          <input type="text" class="form-control" id="tarjeta" required>
        </div>
        <div class="mb-3">
          <label for="nombreTarjeta" class="form-label">Nombre en la tarjeta</label>
          <input type="text" class="form-control" id="nombreTarjeta" required>
        </div>
        <div class="mb-3">
          <label for="vencimiento" class="form-label">Vencimiento</label>
          <input type="month" class="form-control" id="vencimiento" required>
        </div>
        <div class="mb-3">
          <label for="cvv" class="form-label">CVV</label>
          <input type="text" class="form-control" id="cvv" required>
        </div>
      `;
    } else if (tipo === "mercadopago") {
      formularioEspecifico.innerHTML = `
        <div class="mb-3">
          <label for="emailMP" class="form-label">Email de MercadoPago</label>
          <input type="email" class="form-control" id="emailMP" required>
        </div>
      `;
    } else if (tipo === "transferencia") {
      formularioEspecifico.innerHTML = `
        <div class="mb-3">
          <label for="cbu" class="form-label">CBU/CVU</label>
          <input type="text" class="form-control" id="cbu" required>
        </div>
        <div class="mb-3">
          <label for="titular" class="form-label">Titular de la cuenta</label>
          <input type="text" class="form-control" id="titular" required>
        </div>
      `;
    } else if (tipo === "qr") {
      formularioEspecifico.innerHTML = `
        <div class="mb-3">
          <label for="aliasQR" class="form-label">Alias o ID QR</label>
          <input type="text" class="form-control" id="aliasQR" required>
        </div>
      `;
    }
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const tipo = metodo.value;
    if (!tipo) {
      metodo.classList.add("is-invalid");
      return;
    } else {
      metodo.classList.remove("is-invalid");
    }

    let valido = true;
    const campos = formularioEspecifico.querySelectorAll("input");
    campos.forEach(campo => {
      if (!campo.value.trim()) {
        campo.classList.add("is-invalid");
        valido = false;
      } else {
        campo.classList.remove("is-invalid");
      }
    });

    if (!valido) return;

    if (tipo === "tarjeta") {
      const numero = document.getElementById("tarjeta").value.replace(/\s/g, "");
      const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
      if (!regex.test(numero)) {
        alert("Tarjeta inválida o no reconocida.");
        return;
      }
    }

    const envioElegido = document.querySelector('input[name="envio"]:checked');
    if (!envioElegido) {
      alert("Seleccioná un tipo de entrega.");
      return;
    }

    const productos = JSON.parse(localStorage.getItem("carrito")) || [
      { nombre: "Túnica de Gryffindor", precio: 4999 },
      { nombre: "Bufanda de Slytherin", precio: 2999 }
    ];

    let total = productos.reduce((acc, p) => acc + parseFloat(p.precio), 0);

    let envioTexto = "";
    if (envioElegido.value === "domicilio") {
      total += 15000;
      envioTexto = "Envío a domicilio (+$15.000)";
    } else {
      envioTexto = "Retiro en sucursal (Gratis)";
    }

    detalleProductos.innerHTML = productos.map(p => `🪄 ${p.nombre} - $${p.precio}`).join("<br>");
            detalleEnvio.innerHTML = `🚚 ${envioTexto}`;
    totalFinal.innerHTML = `💸 Total: $${total}`;

    const datos = ["nombre", "direccion", "ciudad", "codigoPostal", "email", "telefono"].map(id => {
      const valor = localStorage.getItem("envio_" + id);
      return valor ? `<strong>${id}:</strong> ${valor}` : "";
    }).join("<br>");
    datosComprador.innerHTML = datos;

    resumen.style.display = "block";

    // Recupera el número de teléfono guardado en localStorage
const telefono = localStorage.getItem("envio_telefono");

// Lee el estado actual del checkbox visual en el momento del clic
const modoDebug = document.getElementById("modoDebugToggle").checked;

if (telefono) {
// Genera el mensaje de WhatsApp con todos los datos del pedido
const mensaje = encodeURIComponent(
`🧾 Gracias por tu compra en Avada Kedavra.\n` +
`Total: $${total}\n` +
`${envioTexto}\n` +
`Productos:\n` +
productos.map(p => `- ${p.nombre}: $${p.precio}`).join("\n") + `\n` +
`📍 Envío a: ${localStorage.getItem("envio_direccion")}, ${localStorage.getItem("envio_ciudad")}\n` +
`📞 Contacto: ${telefono}`
);

// Construye el link de WhatsApp con el mensaje generado
const link = `https://wa.me/${telefono.replace(/\D/g, "")}?text=${mensaje}`;

if (modoDebug) {
// Si el checkbox está marcado, se activa el modo debug
console.log("🧪 Modo debug activado");
console.log("Mensaje generado:", decodeURIComponent(mensaje));
console.log("Link simulado:", link);
alert("Modo debug: el mensaje fue generado pero no se envió.");
} else {
// Si el checkbox está desmarcado, se abre WhatsApp con el mensaje real
setTimeout(() => {
  window.open(link, "_blank");
}, 1000);
}
}

// Guarda el tipo de envío elegido para mostrarlo en confirmacion.html
localStorage.setItem("envio_tipo", envioTexto);


// Guarda el total final calculado para mostrarlo en confirmacion.html
localStorage.setItem("envio_total", total.toFixed(2));


// Guarda el estado del modo debug (true o false) para que confirmacion.html lo respete
localStorage.setItem("modo_debug", modoDebug);

// Guarda el carrito para mostrar los productos en confirmacion.html
localStorage.setItem("carrito", JSON.stringify(productos));

// Redirige automáticamente a la vista de confirmación
window.location.href = "confirmacion.html";


  });
});
