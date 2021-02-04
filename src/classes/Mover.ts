import { Directions } from 'App';
import CanvasComponent from './CanvasComponent';
import Floor from './Floor';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly INITIAL_ACCELERATION = 0.09;
  private static readonly INITIAL_MAXIMUM_SPEED = 5;
  private static readonly DECELERATION_SPEED_IN_AIR = 0.1;
  private static readonly ACCELERATION_RATE_IN_AIR = 0.3;
  private static readonly HEAD_WIDTH = 10;

  directions: Directions = 'RIGHT';
  gravitationalForce = 0;
  isOnFloor = false;

  private _acceleration = Mover.INITIAL_ACCELERATION;
  private get acceleration() {
    if (this.isOnFloor) {
      return this._acceleration;
    }
    return this._acceleration * Mover.ACCELERATION_RATE_IN_AIR;
  }
  private _maximumSpeed = Mover.INITIAL_MAXIMUM_SPEED;
  private get maximumSpeed() {
    if (this.isOnFloor) {
      return this._maximumSpeed;
    }
    return this._maximumSpeed * Mover.ACCELERATION_RATE_IN_AIR;
  }
  private speed = 0;
  private readonly MIDDLE: number;
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

  private accelerate(pressedDirections?: Directions) {
    if (pressedDirections !== this.directions) {
      this.speed = 0;
      return;
    }

    const { maximumSpeed, acceleration } = this;

    if (this.speed > maximumSpeed) {
      this.speed -= Mover.DECELERATION_SPEED_IN_AIR;
      return;
    }

    this.speed = Math.min(this.speed + acceleration, maximumSpeed);
  }

  moveSide(floors: Floor[], pressedDirections?: Directions) {
    this.accelerate(pressedDirections);

    if (!pressedDirections) {
      return;
    }

    this.directions = pressedDirections;
    switch (this.directions) {
      case 'RIGHT':
        this.x += this.speed;
        break;
      case 'LEFT':
        this.x -= this.speed;
        break;
    }

    const hitFloor = floors.find((floor) => floor.isHitSideBy(this));
    if (hitFloor) {
      this.speed = 0;
      this.x = hitFloor.getGapSideWith(this);
    }
  }

  renderCanvas(context: CanvasRenderingContext2D) {
    context.fillText(`${this.isOnFloor}: ${this.speed}`, 10, 10);
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
