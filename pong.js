import { drawRect, drawBall } from './utils.js';
import { Player, Computer } from './player.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(20, canvas.height / 2 - 50, 10, 100, 5);
const computer = new Computer(canvas.width - 30, canvas.height / 2 - 50, 10, 100, 4);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4);

let playerScore = 0;
let computerScore = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(ctx, player.x, player.y, player.width, player.height, 'blue');
  drawRect(ctx, computer.x, computer.y, computer.width, computer.height, 'red');
  drawBall(ctx, ball.x, ball.y, ball.radius, 'white');

  ctx.font = '32px Arial';
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
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    player.stop();
  }
});

loop();
