import CanvasComponent from './CanvasComponent';

type Directions = 'LEFT' | 'RIGHT';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly ACCELERATION = 0.09;
  private static readonly MAXIMUM_SPEED = 5;
  private static readonly HEAD_WIDTH = 10;

  private readonly MIDDLE: number;
  private speed = 0;
  private directions: Directions = 'RIGHT';
  private get headToX() {
    return this.directions === 'LEFT' ? this.x : this.right;
  }
  private get headToY() {
    return this.y + this.MIDDLE;
  }
  private get bodyX() {
    return this.directions === 'LEFT'
      ? this.x + Mover.HEAD_WIDTH
      : this.right - Mover.HEAD_WIDTH;
  }
  private get tailX() {
    return this.directions === 'LEFT' ? this.right : this.x;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Mover.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);

    this.MIDDLE = this.height / 2;
  }

  private updateSpeed(pressedDirections?: Directions) {
    if (!pressedDirections || pressedDirections !== this.directions) {
      this.speed = 0;
      return;
    }

    const nextSpeed = this.speed + Mover.ACCELERATION;
    if (nextSpeed > Mover.MAXIMUM_SPEED) {
      this.speed = Mover.MAXIMUM_SPEED;
      return;
    }

    this.speed = nextSpeed;
  }

  moveSide(pressedDirections?: Directions) {
    this.updateSpeed(pressedDirections);

    if (pressedDirections) {
      this.directions = pressedDirections;
    }

    if (pressedDirections === 'RIGHT') {
      this.x += this.speed;
    }

    if (pressedDirections === 'LEFT') {
      this.x -= this.speed;
    }
  }

  renderCanvas(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.headToX, this.headToY);
    context.lineTo(this.bodyX, this.top);
    context.lineTo(this.tailX, this.top);
    context.lineTo(this.tailX, this.bottom);
    context.lineTo(this.bodyX, this.bottom);
    context.fill();
  }
}

export default Mover;
