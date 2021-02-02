import CanvasComponent from './CanvasComponent';
import Keyboard from '@classes/Keyboard';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly KEYBOARD = new Keyboard();
  private static readonly ACCELERATION = 0.09;
  private static readonly MAXIMUM_SPEED = 5;

  private speed = 0;
  private directions: 'LEFT' | 'RIGHT' = 'RIGHT';

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Mover.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);
  }

  private inertia() {
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
    this.inertia();
    this.moveSide();

    super.update(context);
  }
}

export default Mover;
