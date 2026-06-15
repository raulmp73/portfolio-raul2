/* =====================================================================
   PORTFOLIO (versión simple) — Raúl Maciá Pérez
   Solo lo imprescindible: menú móvil, año y envío del formulario.
   ===================================================================== */
(function () {
    'use strict';

    /* Año actual en el footer */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* Menú móvil */
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { menu.classList.remove('open'); });
        });
    }

    /* Envío del formulario sin recargar la página */
    var form = document.getElementById('contact-form');
    if (form) {
        var msg = document.getElementById('form-msg');
        var btn = document.getElementById('submit-btn');

        function showMsg(text, ok) {
            if (!msg) return;
            msg.textContent = text;
            msg.className = 'form__msg ' + (ok ? 'ok' : 'err');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validación nativa del navegador (required, type=email, minlength...)
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';
            showMsg('', true);

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
                .then(function (r) { return r.json().catch(function () { return { ok: false, message: 'Respuesta no válida del servidor.' }; }); })
                .then(function (res) {
                    showMsg(res.message || (res.ok ? '¡Mensaje enviado!' : 'No se pudo enviar.'), !!res.ok);
                    if (res.ok) form.reset();
                })
                .catch(function () {
                    showMsg('Error de conexión. ¿Está el servidor PHP en marcha?', false);
                })
                .finally(function () {
                    btn.disabled = false;
                    btn.textContent = 'Enviar mensaje';
                });
        });
    }
})();
