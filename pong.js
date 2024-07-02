import { drawRect, drawBall, drawImage } from './utils.js';
import { Player, Computer } from './player.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const messiImage = new Image();
messiImage.src = './assets/messi.png';

const armaniImage = new Image();
armaniImage.src = './assets/armani.png';

const dibuMartinezImage = new Image();
dibuMartinezImage.src = './assets/dibu-martinez.png';

let currentGoalie = dibuMartinezImage;
let currentSubstitute = armaniImage;
let isArmani = false; // Estado para verificar si el portero es Armani

const player = new Player(20, canvas.height / 2 - 75, 120, 150, 5, messiImage); // Ajustado el ancho de Messi
const computer = new Computer(canvas.width - 120, canvas.height / 2 - 75, 120, 150, 4, dibuMartinezImage); // Ajustado el ancho del Dibu
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4);

let playerScore = 0;
let computerScore = 0;

const background = new Image();
background.src = './assets/cancha.png';

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el fondo del estadio
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Dibujar los elementos del juego
  drawImage(ctx, player.image, player.x, player.y, player.width, player.height);
  drawImage(ctx, currentGoalie, computer.x, computer.y, computer.width, computer.height);
  drawBall(ctx, ball.x, ball.y, ball.radius, 'white');

  // Dibujar marcador
  ctx.font = '32px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(playerScore, canvas.width / 4, 50);
  ctx.fillText(computerScore, 3 * canvas.width / 4, 50);
}

function update() {
  player.update(canvas);
  computer.update(ball, canvas);
  ball.update(player, computer, canvas, isArmani); // Pasar el estado del portero actual

  // Lógica de puntuación y reseteo de la pelota
  if (ball.x - ball.radius < 0) {
    computerScore++;
    ball.reset(canvas.width / 2, canvas.height / 2);
  }

  if (ball.x + ball.radius > canvas.width) {
    playerScore++;
    ball.reset(canvas.width / 2, canvas.height / 2);
  }
}

function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

// Eventos del teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    player.moveUp();
  } else if (e.key === 'ArrowDown') {
    player.moveDown();
  } else if (e.key === 'a' || e.key === 'A') {
    ball.trap(); // Atrapar la pelota con la tecla 'A'
  } else if (e.key === ' ') {
    ball.shootStraight(); // Disparar recto con la barra espaciadora
  }
});

// Evento click para cambiar entre Armani y Dibu Martínez
document.getElementById('suplente').addEventListener('click', () => {
  const tempSrc = currentGoalie.src;
  currentGoalie.src = currentSubstitute.src;
  currentSubstitute.src = tempSrc;
  document.getElementById('suplente').src = currentSubstitute.src; // Actualizar imagen en el banco de suplentes
  isArmani = !isArmani; // Cambiar el estado del portero actual
});

// Iniciar el juego
loop();
