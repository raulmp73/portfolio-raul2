// ===== Año actual en el pie de página =====
document.getElementById("anio").textContent = new Date().getFullYear();

// ===== Menú del móvil: abrir / cerrar =====
const menu = document.getElementById("menu");
document.getElementById("boton-menu").addEventListener("click", () => menu.classList.toggle("abierto"));
// Cerrar el menú al pulsar un enlace
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") menu.classList.remove("abierto"); });

// ===== Formulario de contacto: enviar sin recargar la página =====
const formulario = document.getElementById("formulario");
const aviso = document.getElementById("aviso");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validación del navegador (campos obligatorios, correo válido, etc.)
  if (!formulario.checkValidity()) return formulario.reportValidity();

  aviso.textContent = "Enviando...";

  fetch(formulario.action, { method: "POST", body: new FormData(formulario) })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      aviso.textContent = datos.message;
      if (datos.ok) formulario.reset();
    })
    .catch(() => { aviso.textContent = "Error de conexión. ¿Está encendido el servidor PHP?"; });
});
