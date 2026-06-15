# Portfolio (versión simple) — Raúl Maciá Pérez

Versión **simple, minimalista y sin animaciones** de mi portfolio personal.
Tema claro y limpio, centrado en el contenido.

**Tecnologías:** HTML5 · CSS3 · JavaScript · PHP

> ¿Buscas la versión animada (tema oscuro neón)? Está en
> [portfolio-raul](https://github.com/raulmp73/portfolio-raul).

## Estructura

```
portfolio-raul2/
├── index.html        → Página principal
├── css/styles.css    → Estilos (tema claro y simple)
├── js/main.js        → Menú móvil y envío del formulario
├── php/contacto.php  → Procesa el formulario y envía el correo
└── assets/           → Foto, favicon y CV
```

## Cómo verlo

- **Solo la parte visual:** abre `index.html` en el navegador (el formulario necesita PHP).
- **Completo, con el formulario (XAMPP):**
  1. Copia esta carpeta dentro de `C:\xampp\htdocs\`
  2. Inicia **Apache** en XAMPP
  3. Entra en `http://localhost/portfolio-raul2/`

Los mensajes se guardan en `php/mensajes.log`. Para recibirlos en tu Gmail,
configura el SMTP en XAMPP (igual que en la otra versión). ⚠️ GitHub Pages no ejecuta PHP.

## Personalización

| Qué cambiar        | Dónde                                          |
|--------------------|------------------------------------------------|
| Correo de destino  | `php/contacto.php` → `$EMAIL_DESTINO`          |
| Textos             | `index.html`                                  |
| Color de acento    | `css/styles.css` → variable `--accent`        |

---

© 2026 **Raúl Maciá Pérez** · Callosa del Segura, Alicante
