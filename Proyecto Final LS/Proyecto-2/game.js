// Variables globales y configuración inicial
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const escala = 20;
const filas = canvas.height / escala;
const columnas = canvas.width / escala;

let serpiente, fruta, puntuacion, nombreJugador, intervaloJuego;
const velocidadSerpiente = 150; // Velocidad inicial de la serpiente en milisegundos

// Clase Serpiente
class Serpiente {
    constructor() {
        this.reset(); // Inicializa la serpiente
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.velocidadX = escala;
        this.velocidadY = 0;
        this.total = 2;
        this.cola = [];
    }

    // Dibuja la serpiente en el canvas
    dibujar() {
        ctx.fillStyle = '#FFFF00'; // Color amarillo para la cabeza
        ctx.fillRect(this.x, this.y, escala, escala);
        ctx.fillStyle = '#00FF00'; // Color verde para el cuerpo
        this.cola.forEach(segmento => ctx.fillRect(segmento.x, segmento.y, escala, escala));
    }

    // Actualiza la posición de la serpiente
    actualizar() {
        for (let i = 0; i < this.cola.length - 1; i++) {
            this.cola[i] = this.cola[i + 1];
        }
        this.cola[this.total - 1] = { x: this.x, y: this.y };
        this.x += this.velocidadX;
        this.y += this.velocidadY;
        this.verificarColisionBordes();
    }

    // Cambia la dirección de la serpiente según las teclas de flecha presionadas
    cambiarDireccion(direccion) {
        const movimientos = {
            'Up': () => { if (this.velocidadY === 0) { this.velocidadX = 0; this.velocidadY = -escala; }},
            'Down': () => { if (this.velocidadY === 0) { this.velocidadX = 0; this.velocidadY = escala; }},
            'Left': () => { if (this.velocidadX === 0) { this.velocidadX = -escala; this.velocidadY = 0; }},
            'Right': () => { if (this.velocidadX === 0) { this.velocidadX = escala; this.velocidadY = 0; }}
        };
        movimientos[direccion]?.(); // Si la dirección es válida, la cambia
    }

    // Verifica si la serpiente ha comido la fruta
    comer(fruta) {
        if (this.x === fruta.x && this.y === fruta.y) {
            this.total++;
            return true;
        }
        return false;
    }

    // Verifica si la serpiente ha colisionado consigo misma
    verificarColision() {
        this.cola.forEach(segmento => {
            if (this.x === segmento.x && this.y === segmento.y) {
                this.perder();
            }
        });
    }

    // Verifica si la serpiente ha colisionado con los bordes del canvas
    verificarColisionBordes() {
        if (this.x >= canvas.width || this.x < 0 || this.y >= canvas.height || this.y < 0) {
            this.perder();
        }
    }

    // Maneja la pérdida del juego
    perder() {
        clearInterval(intervaloJuego); // Detiene el juego
        mostrarRanking();
        alert(`¡Perdiste! Tu puntuación fue: ${puntuacion}. Presiona "Aceptar" para volver a intentarlo.`);

        solicitarNombre(); // Reinicia el juego
    }
}

// Clase Fruta
class Fruta {
    // Coloca la fruta en una ubicación aleatoria dentro del canvas
    elegirUbicacion() {
        this.x = Math.floor(Math.random() * columnas) * escala;
        this.y = Math.floor(Math.random() * filas) * escala;
    }

    // Dibuja la fruta en el canvas
    dibujar() {
        ctx.fillStyle = '#FF0000'; // Color rojo para la fruta
        ctx.fillRect(this.x, this.y, escala, escala);
    }
}

// Configuración inicial del juego
function setup() {
    solicitarNombre(); // Pide el nombre del jugador
}

// Solicita el nombre del jugador y luego inicia el juego
function solicitarNombre() {
    nombreJugador = prompt('Ingresa tu nombre:')?.trim() || 'Invitado';
    iniciarJuego();
}

// Inicializa o reinicia el juego
function iniciarJuego() {
    puntuacion = 0;
    actualizarPuntuacion(); // Resetea la puntuación
    clearInterval(intervaloJuego); // Limpia cualquier intervalo de juego previo
    serpiente = new Serpiente(); // Crea una nueva serpiente
    fruta = new Fruta(); // Crea una nueva fruta
    fruta.elegirUbicacion(); // Coloca la fruta en una ubicación aleatoria
    intervaloJuego = setInterval(juegoLoop, velocidadSerpiente); // Inicia el bucle del juego
}

// Bucle principal del juego
function juegoLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    fruta.dibujar(); // Dibuja la fruta
    serpiente.actualizar(); // Actualiza la posición de la serpiente
    serpiente.dibujar(); // Dibuja la serpiente

    if (serpiente.comer(fruta)) { // Si la serpiente come la fruta
        puntuacion += 10; // Aumenta la puntuación
        fruta.elegirUbicacion(); // Coloca una nueva fruta
        actualizarPuntuacion(); // Actualiza la puntuación en pantalla
    }

    serpiente.verificarColision(); // Verifica colisiones de la serpiente
}

// Actualiza la visualización de la puntuación en la página
function actualizarPuntuacion() {
    document.querySelector('.valor-puntuacion').innerText = puntuacion;
}

// Muestra el ranking de jugadores
function mostrarRanking() {
    const rankingList = document.getElementById('rankingList');
    const rankingItem = document.createElement('div');
    rankingItem.classList.add('ranking-item');
    rankingItem.innerText = `${nombreJugador}: ${puntuacion}`;
    rankingList.appendChild(rankingItem); // Agrega el nuevo elemento al ranking

    // Ordena el ranking
    const items = Array.from(rankingList.children);
    items.sort((a, b) => parseInt(b.innerText.split(': ')[1]) - parseInt(a.innerText.split(': ')[1]));

    rankingList.innerHTML = ''; // Limpia el ranking
    items.slice(0, 5).forEach(item => rankingList.appendChild(item)); // Muestra los 5 mejores
}

// Detecta las pulsaciones de teclas y cambia la dirección de la serpiente
window.addEventListener('keydown', evt => serpiente.cambiarDireccion(evt.key.replace('Arrow', '')));

setup(); // Inicia la configuración del juego
