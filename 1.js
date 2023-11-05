//¿cual figura es la clave de fa?----------------------------------------------------------------------------------------

const imagenModule = (function () {
  const imagenes = ["imagenes/sol.png", "imagenes/fa.png", "imagenes/do.png"];
  let indiceImagen = 0;

  const imagenElement = document.getElementById("imagen");
  const anteriorButton = document.getElementById("anterior");
  const siguienteButton = document.getElementById("siguiente");
  const respuestaInput = document.getElementById("respuesta");
  const comprobarButton = document.getElementById("comprobar");
  const mensajeP = document.getElementById("mensaje");

  const colores = ["red", "green", "blue", "orange", "purple"];
  let colorIndex = 0;
  let intervalId;

  function mostrarImagen() {
    imagenElement.src = imagenes[indiceImagen];
  }

  function siguienteImagen() {
    indiceImagen++;
    if (indiceImagen >= imagenes.length) {
      indiceImagen = 0;
    }
    mostrarImagen();
  }

  function imagenAnterior() {
    indiceImagen--;
    if (indiceImagen < 0) {
      indiceImagen = imagenes.length - 1;
    }
    mostrarImagen();
  }

  function comprobarRespuesta() {
    const respuesta = respuestaInput.value.toLowerCase();
    const respuestaCorrecta = "2"; // Reemplaza con la respuesta correcta

    if (respuesta === respuestaCorrecta) {
      mensajeP.textContent = "¡Correcto! ¡Has acertado!";
    } else {
      mensajeP.textContent = "Incorrecto. ¡Inténtalo de nuevo!";
    }
    cambiarColor();
  }

  function cambiarColor() {
    mensajeP.style.color = colores[colorIndex];
    colorIndex = (colorIndex + 1) % colores.length;
  }

  function iniciar() {
    mostrarImagen();
    siguienteButton.addEventListener("click", siguienteImagen);
    anteriorButton.addEventListener("click", imagenAnterior);
    comprobarButton.addEventListener("click", comprobarRespuesta);

    intervalId = setInterval(cambiarColor, 1000);
    
    setTimeout(() => {
      clearInterval(intervalId);
      mensajeP.textContent = "";
    }, 5000);
  }

  return {
    iniciar: iniciar,
  };
})();

// Inicia el módulo
imagenModule.iniciar();

//conectalas notas con su nombre--------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const notas = document.querySelectorAll(".nota");
  const mensajeFelicitacion = document.getElementById("mensaje-felicitacion");
  let coincidenciasCorrectas = 0; // Para contar las coincidencias correctas

  notas.forEach((nota) => {
    nota.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", nota.id);
    });
  });

  const mostrarMensajeFelicitacion = () => {
    mensajeFelicitacion.innerHTML =
      '<p class="mensaje-felicitacion">¡Has emparejado todas las notas correctamente!</p>';
    mensajeFelicitacion.style.fontSize = "32px"; // Tamaño de fuente más grande
    mensajeFelicitacion.style.fontWeight = "bold"; // Texto en negrita
    mensajeFelicitacion.style.color = "green"; // Color verde
    mensajeFelicitacion.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)"; // Sombra de texto
    mensajeFelicitacion.style.textAlign = "center"; // Alineación centrada
    mensajeFelicitacion.style.transition = "opacity 1s ease-in-out"; // Animación de opacidad
    mensajeFelicitacion.style.opacity = "1"; // Hace que el mensaje sea visible

    // Oculta el mensaje después de unos segundos (puedes ajustar el tiempo)
    setTimeout(function () {
      mensajeFelicitacion.style.opacity = "0";
    }, 3000); // El mensaje se ocultará después de 3 segundos (3000 ms)
  };

  notas.forEach((nombre) => {
    nombre.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    nombre.addEventListener("drop", (e) => {
      e.preventDefault();
      const notaId = e.dataTransfer.getData("text/plain");
      const nombreId = nombre.id;

      if (notaId === nombreId) {
        const notaSeleccionada = document.querySelector(`#${notaId}`);
        if (!notaSeleccionada.classList.contains("emparejada")) {
          notaSeleccionada.classList.add("emparejada");
          notaSeleccionada.style.pointerEvents = "none";
          coincidenciasCorrectas++;

          if (coincidenciasCorrectas === notas.length) {
            mostrarMensajeFelicitacion();
          } else {
            mensajeFelicitacion.textContent = "Correcto";
            mensajeFelicitacion.style.fontSize = "24px"; // Tamaño de fuente más grande
            mensajeFelicitacion.style.color = "blue"; // Color azul
          }
        }
      }
    });
  });
});

// JavaScript para el juego escala sibemol----------------------------------------------------------------------------
// Lista de imágenes para el juego
{
  const imagenesCartas = [
    "respiracion.jpg",
    "respiracion.jpg",
    "sonidos.jpg",
    "sonidos.jpg",
    "nota.jpg",
    "nota.jpg",
    "agil.jpg",
    "agil.jpg",
  ];

  function barajarCartas() {
    imagenesCartas.sort(() => Math.random() - 0.5);
    const cartas = document.querySelectorAll(".carta");
    cartas.forEach((carta, index) => {
      carta.style.order = index;
      carta.classList.remove("volteada", "coincidencia");
      carta.dataset.imagen = imagenesCartas[index];
      carta.addEventListener("click", voltearCarta);
    });
  }

  function voltearCarta() {
    if (this.classList.contains("volteada")) return;
    this.classList.add("volteada");
    const cartasVolteadas = document.querySelectorAll(".volteada");
    if (cartasVolteadas.length === 2) {
      const [primeraCarta, segundaCarta] = cartasVolteadas;
      if (primeraCarta.dataset.imagen === segundaCarta.dataset.imagen) {
        primeraCarta.classList.add("coincidencia");
        segundaCarta.classList.add("coincidencia");
      }
      setTimeout(() => {
        cartasVolteadas.forEach((carta) => carta.classList.remove("volteada"));
      }, 1000);
    }
    verificarVictoria();
  }

  function verificarVictoria() {
    const cartasCoincidentes = document.querySelectorAll(".coincidencia");
    if (cartasCoincidentes.length === imagenesCartas.length) {
      const mensajeVictoria = document.getElementById("mensaje-victoria");
      mensajeVictoria.classList.add("aparecer");
      setTimeout(() => {
        mensajeVictoria.style.display = "block";
      }, 500);
    }
  }

  function restart() {
    barajarCartas();
  }

  restart();
}



// juego respuesta pentagrama-----------------------------------------------------------------------------------------
const opcionesModule = (function () {
  // Obtener los elementos de los botones y el mensaje
  const botonPentagrama = document.getElementById("opcion-pentagrama");
  const botonBoquilla = document.getElementById("opcion-boquilla");
  const botonCoda = document.getElementById("opcion-coda");
  const mensaje = document.getElementById("mensaje");

  // Función para establecer el mensaje y color
  function establecerMensaje(respuesta, color) {
    mensaje.textContent = respuesta;
    mensaje.style.color = color;
  }

  // Agregar un evento de clic al botón del pentagrama
  botonPentagrama.addEventListener("click", function () {
    establecerMensaje("Respuesta correcta", "green");
  });

  // Agregar eventos de clic a los botones de boquilla y coda
  botonBoquilla.addEventListener("click", function () {
    establecerMensaje("Respuesta incorrecta", "red");
  });

  botonCoda.addEventListener("click", function () {
    establecerMensaje("Respuesta incorrecta", "red");
  });
})();

//juego de reconocimiento de pocisiones de notas--------------------------------------------------------------------
const NotasModule = (function () {
  const notas = [
    { nombre: "sib", posicion: 1 },
    { nombre: "do", posicion: 6 },
    { nombre: "re", posicion: 4 },
    { nombre: "mib", posicion: 3 },
    { nombre: "fa", posicion: 1 },
    { nombre: "sol", posicion: 4 },
    { nombre: "la", posicion: 2 },
    { nombre: "sibalto", posicion: 1 },
  ];

  function comprobarRespuesta(notaNombre, respuestaInputID, mensajeID) {
    const respuestaInput = document.getElementById(respuestaInputID);
    const mensaje = document.getElementById(mensajeID);

    const respuestaCorrecta = notas.find((nota) => nota.nombre === notaNombre)
      .posicion;

    if (respuestaInput.value === respuestaCorrecta.toString()) {
      mensaje.textContent = "¡Correcto!";
      mensaje.style.color = "#4CAF50";
    } else {
      mensaje.textContent = "Vuelve a intentarlo.";
      mensaje.style.color = "#F44336";
    }

    respuestaInput.value = ""; // Limpiar el campo de respuesta
  }

  function agregarEventoVerificar(notaNombre, respuestaInputID, mensajeID) {
    document
      .getElementById(`verificar-${notaNombre}`)
      .addEventListener("click", () =>
        comprobarRespuesta(notaNombre, respuestaInputID, mensajeID)
      );
  }

  return {
    agregarEventoVerificar: agregarEventoVerificar,
  };
})();

// Ejemplo de cómo usar el módulo
NotasModule.agregarEventoVerificar("sib", "respuesta-sib", "mensaje-sib");
NotasModule.agregarEventoVerificar("do", "respuesta-do", "mensaje-do");
NotasModule.agregarEventoVerificar("re", "respuesta-re", "mensaje-re");
NotasModule.agregarEventoVerificar("mib", "respuesta-mib", "mensaje-mib");
NotasModule.agregarEventoVerificar("fa", "respuesta-fa", "mensaje-fa");
NotasModule.agregarEventoVerificar("sol", "respuesta-sol", "mensaje-sol");
NotasModule.agregarEventoVerificar("la", "respuesta-la", "mensaje-la");
NotasModule.agregarEventoVerificar("sibalto", "respuesta-sibalto", "mensaje-sibalto");

// juego memoria logica ------------------------------------------------------------------------------------------

const MemoryGameModule = (function () {
  const gridContainer = document.querySelector(".grid-container");
  let cards = [];
  let firstCard, secondCard;
  let lockBoard = false;
  let score = 0;

  function init() {
    document.querySelector(".score").textContent = score;

    fetch("./data/cards.json")
      .then((res) => res.json())
      .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
      });
  }

  function shuffleCards() {
    let currentIndex = cards.length,
      randomIndex,
      temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  }

  function generateCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
  }

  return {
    init: init,
    restart: restart,
  };
})();

// Iniciar el juego cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
  MemoryGameModule.init();
});
