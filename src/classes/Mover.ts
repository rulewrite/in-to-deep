import CanvasComponent from './CanvasComponent';
import Keyboard from '@classes/Keyboard';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly KEYBOARD = new Keyboard();
  private static readonly ACCELERATION = 0.09;
  private static readonly MAXIMUM_SPEED = 5;
  private static readonly HEAD_WIDTH = 10;

  private readonly MIDDLE: number;
  private speed = 0;
  private directions: 'LEFT' | 'RIGHT' = 'RIGHT';
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

  private updateSpeed() {
    const {
      isPressedRight,
      isPressedLeft,
      isPressedMovingKey,
    } = Mover.KEYBOARD;
    const { directions } = this;

    if (
      !isPressedMovingKey ||
      (isPressedLeft && directions === 'RIGHT') ||
      (isPressedRight && directions === 'LEFT')
    ) {
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

  private moveSide() {
    const { isPressedRight, isPressedLeft } = Mover.KEYBOARD;

    if (isPressedRight && !isPressedLeft) {
      this.directions = 'RIGHT';
      this.x += this.speed;
    }

    if (isPressedLeft && !isPressedRight) {
      this.directions = 'LEFT';
      this.x -= this.speed;
    }
  }

  update(context: CanvasRenderingContext2D) {
    this.updateSpeed();
    this.moveSide();

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
