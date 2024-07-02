export function drawRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

export function drawBall(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

export function drawBackground(ctx, image) {
  ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawImage(ctx, image, x, y, width, height) {
  ctx.drawImage(image, x, y, width, height);
}
