export class Ball {
    constructor(x, y, radius, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
    }
  
    update(player, computer, canvas) {
      this.x += this.dx;
      this.y += this.dy;
  
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy *= -1;
      }
  
      if (this.x - this.radius < player.x + player.width &&
          this.y > player.y && this.y < player.y + player.height) {
        this.dx *= -1;
      }
  
      if (this.x + this.radius > computer.x &&
          this.y > computer.y && this.y < computer.y + computer.height) {
        this.dx *= -1;
      }
    }
  
    reset(x, y) {
      this.x = x;
      this.y = y;
      this.dx *= -1;
      this.dy = Math.random() > 0.5 ? 4 : -4;
    }
  }
  