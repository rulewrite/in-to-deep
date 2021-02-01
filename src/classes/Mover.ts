import CanvasComponent from './CanvasComponent';
import Controller from '@classes/Contorller';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly CONTROLLER = new Controller();
  private static readonly ACCELERATION = 0.09;
  private static readonly MAXIMUM_SPEED = 5;

  private _speed = 0;
  private set speed(_speed: number) {
    if (_speed >= Mover.MAXIMUM_SPEED) {
      _speed = Mover.MAXIMUM_SPEED;
    }
    this._speed = _speed;
  }
  private get speed() {
    return this._speed;
  }
  private isDirectionsRight = true;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Mover.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);
  }

  inertia() {
    const { isPressedRight } = Mover.CONTROLLER;

    if (
      this.isDirectionsRight !== isPressedRight ||
      !Mover.CONTROLLER.isPressedMovingKey
    ) {
      this.speed = 0;
    }

    this.isDirectionsRight = isPressedRight;
    this.speed += Mover.ACCELERATION;
  }

  private moveSide() {
    if (Mover.CONTROLLER.isPressedLeft) {
      this.x -= this.speed;
    }

    if (Mover.CONTROLLER.isPressedRight) {
      this.x += this.speed;
    }
  }

  update(context: CanvasRenderingContext2D) {
    this.inertia();
    this.moveSide();

    super.update(context);
  }
}

export default Mover;
