// ===================================================================
//  PORTFOLIO — Raúl Maciá Pérez
//
//  ▼▼▼  TUS DATOS  ▼▼▼
//  Edita SOLO esta parte de arriba para actualizar la web
//  (cuando te gradúes en algo, hagas un proyecto nuevo, etc.).
//  La lógica está más abajo y no hace falta tocarla.
// ===================================================================

// ---- FORMACIÓN ----
// El "estado" puede ser: "done" (finalizado), "now" (en curso) o "goal" (objetivo)
const formacion = [
  {
    estado: "done",
    titulo: "Grado Medio en Sistemas Microinformáticos y Redes",
    texto: "SMR · Base en hardware, sistemas operativos y redes.",
  },
  {
    estado: "now",
    titulo: "Grado Superior en Desarrollo de Aplicaciones Web",
    texto: "DAW · Java, HTML, CSS, JavaScript, PHP y bases de datos.",
  },
  {
    estado: "goal",
    titulo: "Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
    texto: "DAM · Mi próxima meta formativa.",
  },
];

// ---- HABILIDADES ----
// Añade el nombre de cada tecnología entre comillas.
const habilidades = ["Java", "HTML5", "CSS3", "PHP", "JavaScript", "MySQL"];

// ---- PROYECTOS ----
// Añade un bloque { ... } por cada proyecto nuevo.
const proyectos = [
  {
    titulo: "Cafetería Digital",
    tags: "Java",
    texto: "Gestor de pedidos de una cafetería por consola: crear pedidos, consultar el menú y atenderlos por orden de llegada. Practica ArrayList, LinkedList, HashMap y TreeMap.",
    enlace: "https://github.com/raulmp73/RaulRepositorio",
    enlaceTexto: "Ver código →",
  },
  {
    titulo: "Portfolio Personal",
    tags: "HTML · CSS · JS · PHP",
    texto: "Esta web. Página personal responsive con formulario de contacto en PHP, hecha desde cero con un diseño limpio y sencillo.",
    enlace: "https://github.com/raulmp73",
    enlaceTexto: "Mi GitHub →",
  },
];

// ===================================================================
//  ▼▼▼  LÓGICA  ▼▼▼   (no hace falta tocar nada de aquí para abajo)
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
