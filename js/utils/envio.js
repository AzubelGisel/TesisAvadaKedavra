
document.addEventListener("DOMContentLoaded", () => {
  const campos = ["nombre", "direccion", "ciudad", "codigoPostal", "email", "telefono"];

  const btn = document.getElementById("confirmarEnvio");

  // Restaurar datos si existen
  campos.forEach(id => {
    const campo = document.getElementById(id);
    const guardado = localStorage.getItem("envio_" + id);
    if (guardado) campo.value = guardado;
  });

  // Guardar en tiempo real
  campos.forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener("input", () => {
      localStorage.setItem("envio_" + id, campo.value);
    });
  });

  // Validación y avance
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let valido = true;
    campos.forEach(id => {
      const campo = document.getElementById(id);
      if (!campo.value.trim()) {
        campo.classList.add("is-invalid");
        valido = false;
      } else {
        campo.classList.remove("is-invalid");
      }
    });

    if (!valido) return;

    btn.classList.add("animado");
    setTimeout(() => btn.classList.remove("animado"), 600);

    alert("¡Datos confirmados! Avanzando al pago...");
    window.location.href = "pago.html";
  });
});
