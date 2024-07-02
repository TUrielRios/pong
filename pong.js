// pong.js
import { drawRect, drawBall, drawBackground, drawImage } from './utils.js';
import { Player, Computer } from './player.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Cargar imagen de Messi
const messiImage = new Image();
messiImage.src = './assets/messi.png';

const player = new Player(20, canvas.height / 2 - 75, 100, 150, 5, messiImage); // Ancho ajustado a 70
const computer = new Computer(canvas.width - 90, canvas.height / 2 - 75, 100, 120, 4);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4);

let playerScore = 0;
let computerScore = 0;

const background = new Image();
background.src = './assets/cancha.png';

const dibuMartinez = new Image();
dibuMartinez.src = './assets/dibu-martinez.png';

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx, background);
  drawImage(ctx, player.image, player.x, player.y, player.width, player.height);
  drawImage(ctx, dibuMartinez, computer.x, computer.y, computer.width, computer.height);
  drawBall(ctx, ball.x, ball.y, ball.radius, 'white');

  ctx.font = '32px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(playerScore, canvas.width / 4, 50);
  ctx.fillText(computerScore, 3 * canvas.width / 4, 50);
}

function update() {
  player.update(canvas);
  computer.update(ball, canvas);
  ball.update(player, computer, canvas);

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

loop();
