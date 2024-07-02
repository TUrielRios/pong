export class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.lastHitByPlayer = false;
    this.trappedByPlayer = false; // Estado para indicar si la pelota está atrapada
  }

  update(player, computer, canvas, isArmani) {
    if (!this.trappedByPlayer) {
      this.x += this.dx;
      this.y += this.dy;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy *= -1;
    }

    if (!this.trappedByPlayer) {
      if (this.x - this.radius < player.x + player.width &&
          this.y > player.y && this.y < player.y + player.height) {
        this.dx *= -1.1; // Incrementar velocidad en cada rebote con el jugador
        this.lastHitByPlayer = true;
      }

      if (this.x + this.radius > computer.x) {
        if (isArmani) {
          if (this.y > computer.y && this.y > computer.y + computer.height) {
            this.dx *= -1.1; // Incrementar velocidad en cada rebote con Armani
            this.lastHitByPlayer = false;
          }
        } else {
          if (this.y > computer.y && this.y < computer.y + computer.height) {
            this.dx *= -1.1; // Incrementar velocidad en cada rebote con el Dibu
            this.lastHitByPlayer = false;
          }
        }
      }
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() > 0.5 ? 4 : -4; // Velocidad inicial más alta en x
    this.dy = Math.random() > 0.5 ? 4 : -4; // Velocidad inicial más alta en y
    this.lastHitByPlayer = false;
    this.trappedByPlayer = false; // Reiniciar el estado de atrapada
  }

  shootStraight() {
    if (this.trappedByPlayer) {
      this.trappedByPlayer = false; // Liberar la pelota
      // Disparar recto sin depender del Dibu Martinez
      this.dx = this.lastHitByPlayer ? 6 : -6; // Aumentar velocidad inicial en el disparo
      this.dy = 0; // Disparar en línea recta
    }
  }

  trap() {
    this.trappedByPlayer = true; // Atrapar la pelota
  }
}
