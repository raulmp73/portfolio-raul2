<?php
/* =====================================================================
   PROCESADOR DEL FORMULARIO DE CONTACTO
   Portfolio de Raúl Maciá Pérez
   ---------------------------------------------------------------------
   - Valida y limpia los datos del formulario.
   - Protección anti-spam con "honeypot".
   - Envía el mensaje por correo con mail().
   - Guarda una copia local de cada mensaje (útil al probar con XAMPP).
   - Responde en JSON para el JavaScript (envío sin recargar la página).
   ===================================================================== */

/* ----------------------------- CONFIGURACIÓN ----------------------------- */
$EMAIL_DESTINO       = 'raulmaciaperez3@gmail.com'; // <-- a dónde te llegan los mensajes
$GUARDAR_COPIA_LOCAL = true;                        // guarda los mensajes en mensajes.log
$ARCHIVO_LOG         = __DIR__ . '/mensajes.log';

/* --------------------------- Cabeceras de respuesta ---------------------- */
header('Content-Type: application/json; charset=utf-8');

/**
 * Devuelve una respuesta JSON y termina la ejecución.
 */
function responder($ok, $mensaje, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode(['ok' => $ok, 'message' => $mensaje], JSON_UNESCAPED_UNICODE);
    exit;
}

/* --------------------------- Solo se admite POST ------------------------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido.', 405);
}

/* --------------------------- Anti-spam (honeypot) ------------------------ */
/* El campo "website" está oculto: si llega relleno, es un bot. Fingimos éxito. */
if (!empty($_POST['website'])) {
    responder(true, '¡Mensaje enviado! Gracias por contactar.');
}

/* --------------------------- Recogida de datos --------------------------- */
$nombre  = isset($_POST['nombre'])  ? trim($_POST['nombre'])  : '';
$email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
$asunto  = isset($_POST['asunto'])  ? trim($_POST['asunto'])  : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

/* --------------------------- Validación servidor ------------------------- */
$errores = [];

if (mb_strlen($nombre) < 2)   $errores[] = 'el nombre';
if (mb_strlen($asunto) < 2)   $errores[] = 'el asunto';
if (mb_strlen($mensaje) < 10) $errores[] = 'el mensaje';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'un correo válido';

if (!empty($errores)) {
    responder(false, 'Por favor, revisa ' . implode(', ', $errores) . '.', 422);
}

/* Límites de longitud (evita abusos) */
if (mb_strlen($nombre) > 60 || mb_strlen($asunto) > 120 || mb_strlen($mensaje) > 2000) {
    responder(false, 'Algún campo es demasiado largo.', 422);
}

/* --------------------- Evita inyección de cabeceras ---------------------- */
/* Quita saltos de línea de los campos que se usan en las cabeceras. */
function sinSaltos($texto) {
    return str_replace(["\r", "\n", "%0a", "%0d"], ' ', $texto);
}
$nombreSeguro = sinSaltos($nombre);
$emailSeguro  = sinSaltos($email);
$asuntoSeguro = sinSaltos($asunto);

/* ------------------------- Copia local del mensaje ----------------------- */
if ($GUARDAR_COPIA_LOCAL) {
    $registro = sprintf(
        "==================== %s ====================\nDe: %s <%s>\nAsunto: %s\n\n%s\n\n",
        date('Y-m-d H:i:s'),
        $nombreSeguro,
        $emailSeguro,
        $asuntoSeguro,
        $mensaje
    );
    @file_put_contents($ARCHIVO_LOG, $registro, FILE_APPEND | LOCK_EX);
}

/* ----------------------------- Envío del correo -------------------------- */
$asuntoCorreo = '[Portfolio] ' . $asuntoSeguro;

$cuerpo  = "Has recibido un nuevo mensaje desde tu portfolio:\n\n";
$cuerpo .= "Nombre:  $nombreSeguro\n";
$cuerpo .= "Correo:  $emailSeguro\n";
$cuerpo .= "Asunto:  $asuntoSeguro\n";
$cuerpo .= "-----------------------------------------\n\n";
$cuerpo .= $mensaje . "\n";

$cabeceras  = "MIME-Version: 1.0\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";
$cabeceras .= "From: Portfolio Web <no-reply@portfolio.local>\r\n";
$cabeceras .= "Reply-To: $nombreSeguro <$emailSeguro>\r\n";
$cabeceras .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$enviado = @mail($EMAIL_DESTINO, $asuntoCorreo, $cuerpo, $cabeceras);

/* ----------------------------- Respuesta final --------------------------- */
if ($enviado) {
    responder(true, '¡Mensaje enviado correctamente! Te responderé lo antes posible. ✅');
} elseif ($GUARDAR_COPIA_LOCAL) {
    /* En XAMPP, mail() suele no estar configurado: el mensaje queda guardado
       en mensajes.log para que no se pierda mientras configuras el SMTP. */
    responder(true, '¡Mensaje recibido! Gracias por escribir. ✅');
} else {
    responder(false, 'No se pudo enviar el mensaje. Inténtalo más tarde o escríbeme a ' . $EMAIL_DESTINO);
}
