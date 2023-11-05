// Función de validación del formulario
function validarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var colegio = document.getElementById("colegio").value;
  var edad = document.getElementById("edad").value;
  var sexo = document.getElementById("sexo").value;
  var contrasena = document.getElementById("contrasena").value;

  // Realiza las validaciones que necesites aquí
  if (nombre.trim() === "" || colegio.trim() === "" || isNaN(edad) || sexo.trim() === "" || contrasena.trim() === "") {
      alert("Por favor, complete todos los campos correctamente.");
      return false;
  }

  // Si todos los campos son válidos, el formulario se enviará al servidor
  return true;
}

// Redireccionamiento 
const rutaBase = '/proyectos'; 

function redireccionar(url) {
  window.location.href = rutaBase + url;
}

// Controlador de botones
document.addEventListener('DOMContentLoaded', () => {

  const botonInicio = document.querySelector('.button[href="inicio.html"]');
  const botonRegistrarse = document.querySelector('.button[href="formulario.html"]');

  botonInicio.addEventListener('click', (e) => {
    e.preventDefault();
    redireccionar('iniciosesion.html');
  });

  botonRegistrarse.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(!validarFormulario()) {
      return;
    }
    
    redireccionar('iniciosesion.html');
  });

  
  
});





