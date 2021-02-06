import CanvasComponent from './CanvasComponent';
import Keyboard from './Keyboard';

export enum Directions {
  RIGHT = 1,
  LEFT = -1,
}

class Mover extends CanvasComponent {
  private static readonly INITIAL_ACCELERATION = 0.14;
  private static readonly INITIAL_DECELERATION = 0.5;
  private static readonly INITIAL_MAXIMUM_X_VELOCITY = 5;
  private static readonly INITIAL_MAXIMUM_Y_VELOCITY = 5;
  private static readonly AIR_RESISTANCE = 0.3;

  directions: Directions = Directions.RIGHT;
  xVelocity = 0;
  yVelocity = 0;
  isJumping = false;
  onFloors = new Set<string>();
  get isOnFloor() {
    return Boolean(this.onFloors.size);
  }

  private _acceleration = Mover.INITIAL_ACCELERATION;
  private _deceleration = Mover.INITIAL_DECELERATION;
  private _maximumXVelocity = Mover.INITIAL_MAXIMUM_X_VELOCITY;
  private get acceleration() {
    return this.getWithAirResistance(this._acceleration);
  }
  private get deceleration() {
    return this.getWithAirResistance(this._deceleration);
  }
  private get maximumXVelocity() {
    return this.getWithAirResistance(this._maximumXVelocity);
  }
  private maximumYVelocity = Mover.INITIAL_MAXIMUM_Y_VELOCITY;

  private getWithAirResistance(force: number) {
    if (this.isOnFloor) {
      return force;
    }
    return force * Mover.AIR_RESISTANCE;
  }

  private getPressedDirections(keyboard: Keyboard): Directions | 0 {
    const { isPressedRight, isPressedLeft } = keyboard;

    if (isPressedRight && !isPressedLeft) {
      return Directions.RIGHT;
    }

    if (isPressedLeft && !isPressedRight) {
      return Directions.LEFT;
    }

    return 0;
  }

  private decelerate() {
    if (this.xVelocity === 0) {
      return;
    }

    if (this.xVelocity < 0) {
      const nextVelocity = this.xVelocity + this.deceleration;
      this.xVelocity = Math.min(nextVelocity, 0);
      return;
    }

    const nextVelocity = this.xVelocity - this.deceleration;
    this.xVelocity = Math.max(nextVelocity, 0);
  }

  private accelerate() {
    const { maximumXVelocity, acceleration, directions } = this;

    const nextXVelocity = this.xVelocity + acceleration * directions;
    if (Math.abs(nextXVelocity) < maximumXVelocity) {
      this.xVelocity = nextXVelocity;
      return;
    }
    this.xVelocity = maximumXVelocity * directions;
  }

  private moveUp() {
    this.yVelocity = -this.maximumYVelocity;
  }

  private moveSide() {
    this.x += this.xVelocity;
  }

  move(keyboard: Keyboard) {
    const pressedDirections = this.getPressedDirections(keyboard);
    if (pressedDirections) {
      this.directions = pressedDirections;
      this.accelerate();
    }
    if (Math.sign(pressedDirections) !== Math.sign(this.xVelocity)) {
      this.decelerate();
    }
    this.moveSide();

    this.isJumping = keyboard.isPressedUp && this.isOnFloor;
    if (this.isJumping) {
      this.moveUp();
    }
  }
}

export default Mover;
