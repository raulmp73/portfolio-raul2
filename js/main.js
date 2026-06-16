// ===================================================================
//  LÓGICA DEL PORTFOLIO
//  Los datos están en "datos.json".
//  Edita ESE archivo para actualizar formación, habilidades y proyectos.
// ===================================================================

const nombresEstado = { done: "Finalizado", now: "En curso", goal: "Objetivo" };

// ---- Cargar los datos del JSON y pintar las secciones ----
fetch("datos.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    // Formación
    document.getElementById("formacion-lista").innerHTML = datos.formacion.map((f) => `
      <article class="edu__item">
        <span class="edu__badge edu__badge--${f.estado}">${nombresEstado[f.estado]}</span>
        <h3>${f.titulo}</h3>
        <p>${f.texto}</p>
      </article>`).join("");

    // Habilidades
    document.getElementById("habilidades-lista").innerHTML =
      datos.habilidades.map((h) => `<li>${h}</li>`).join("");

    // Proyectos
    document.getElementById("proyectos-lista").innerHTML = datos.proyectos.map((p) => `
      <article class="card">
        <h3>${p.titulo}</h3>
        <p class="card__tags">${p.tags}</p>
        <p>${p.texto}</p>
        <a href="${p.enlace}" target="_blank" rel="noopener" class="card__link">${p.enlaceTexto}</a>
      </article>`).join("");
  })
  .catch(() => {
    console.error("No se pudo cargar datos.json. Abre la web con XAMPP (http://localhost/...), no con doble clic.");
  });

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
    .then((resultado) => { aviso.textContent = resultado.message; if (resultado.ok) formulario.reset(); })
    .catch(() => { aviso.textContent = "Error de conexión. ¿Está encendido el servidor PHP?"; });
});
