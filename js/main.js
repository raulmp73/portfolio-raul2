// ===================================================================
//  LÓGICA DEL PORTFOLIO
//  No hace falta tocar este archivo: para añadir contenido edita "datos.js".
// ===================================================================

// ---- Pintar la FORMACIÓN ----
const nombresEstado = { done: "Finalizado", now: "En curso", goal: "Objetivo" };
document.getElementById("formacion-lista").innerHTML = formacion.map((f) => `
  <article class="edu__item">
    <span class="edu__badge edu__badge--${f.estado}">${nombresEstado[f.estado]}</span>
    <h3>${f.titulo}</h3>
    <p>${f.texto}</p>
  </article>`).join("");

// ---- Pintar las HABILIDADES ----
document.getElementById("habilidades-lista").innerHTML =
  habilidades.map((h) => `<li>${h}</li>`).join("");

// ---- Pintar los PROYECTOS ----
document.getElementById("proyectos-lista").innerHTML = proyectos.map((p) => `
  <article class="card">
    <h3>${p.titulo}</h3>
    <p class="card__tags">${p.tags}</p>
    <p>${p.texto}</p>
    <a href="${p.enlace}" target="_blank" rel="noopener" class="card__link">${p.enlaceTexto}</a>
  </article>`).join("");

// ---- Año actual en el pie de página ----
document.getElementById("anio").textContent = new Date().getFullYear();

// ---- Menú del móvil: abrir / cerrar ----
const menu = document.getElementById("menu");
document.getElementById("boton-menu").addEventListener("click", () => menu.classList.toggle("abierto"));
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") menu.classList.remove("abierto"); });

// ---- Formulario de contacto: enviar sin recargar la página ----
const formulario = document.getElementById("formulario");
const aviso = document.getElementById("aviso");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formulario.checkValidity()) return formulario.reportValidity();
  aviso.textContent = "Enviando...";
  fetch(formulario.action, { method: "POST", body: new FormData(formulario) })
    .then((respuesta) => respuesta.json())
    .then((datos) => { aviso.textContent = datos.message; if (datos.ok) formulario.reset(); })
    .catch(() => { aviso.textContent = "Error de conexión. ¿Está encendido el servidor PHP?"; });
});
