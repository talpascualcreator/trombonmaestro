// Función de validación del formulario de inicio de sesión
function validarInicioSesion() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Realiza las validaciones que necesites aquí
    if (usuario.trim() === "" || contrasena.trim() === "") {
        alert("Por favor, complete todos los campos correctamente.");
        return false;
    }

    // Aquí puedes realizar una llamada al servidor para autenticar al usuario si es necesario.
    // Reemplaza esto con tu lógica real de autenticación en el servidor.
    // Por ejemplo, puedes usar una solicitud AJAX para enviar el usuario y la contraseña al servidor y verificarlos allí.

    // Simulemos una respuesta del servidor que indica autenticación incorrecta.
    var autenticacionCorrecta = false;

    // Si la autenticación en el servidor es incorrecta, muestra el mensaje de error.
    if (!autenticacionCorrecta) {
        alert("Usuario o contraseña incorrectos");
        return false;
    }

    // Si la autenticación es exitosa, puedes redirigir al usuario a la página de inicio.
    const rutaBase = '/mi-sitio-web';
    window.location.href = rutaBase + 'indexp1.html';
    return false; // Evita que el formulario se envíe
}

// Controlador de botones
document.addEventListener('DOMContentLoaded', () => {
    const botonInicioSesion = document.querySelector('.button[href="iniciosecion.html"]');
    const botonVolver = document.querySelector('.button[href="formulario.html"]');

    botonInicioSesion.addEventListener('click', (e) => {
        e.preventDefault();
        if (!validarInicioSesion()) {
            return;
        }
    });

    botonVolver.addEventListener('click', (e) => {
        e.preventDefault();
        redireccionar('iniciosesion.html');
    });

  
});

 // Obtener el elemento donde se mostrará el año
 var yearSpan = document.getElementById('year');

 // Obtener el año actual
 var currentYear = new Date().getFullYear();

 // Mostrar el año actual en el span
 yearSpan.textContent = currentYear;

 // Función para actualizar el año cada segundo
 function updateYear() {
     var newYear = new Date().getFullYear();
     // Si el año ha cambiado, actualizarlo en el span
     if (newYear !== currentYear) {
         currentYear = newYear;
         yearSpan.textContent = currentYear;
     }
 }

 // Llamar a la función updateYear() cada segundo
 setInterval(updateYear, 1000);

