import CanvasComponent from './CanvasComponent';
import Keyboard from './Keyboard';

export enum Directions {
  RIGHT = 1,
  LEFT = -1,
}

class Mover extends CanvasComponent {
  private static readonly INITIAL_ACCELERATION = 0.14;
  private static readonly INITIAL_DECELERATION = 0.5;
  private static readonly INITIAL_MAXIMUM_SPEED = 5;
  private static readonly DECELERATION_SPEED_IN_AIR = 0.1;
  private static readonly ACCELERATION_RATE_IN_AIR = 0.3;

  directions: Directions = Directions.RIGHT;
  gravitationalForce = 0;
  onFloors = new Set<string>();
  get isOnFloor() {
    return Boolean(this.onFloors.size);
  }
  isJumping = false;
  xVelocity = 0;

  private _acceleration = Mover.INITIAL_ACCELERATION;
  private get acceleration() {
    if (this.isOnFloor) {
      return this._acceleration;
    }
    return this._acceleration * Mover.ACCELERATION_RATE_IN_AIR;
  }
  private _deceleration = Mover.INITIAL_DECELERATION;
  private get deceleration() {
    if (this.isOnFloor) {
      return this._deceleration;
    }
    return this._deceleration * Mover.ACCELERATION_RATE_IN_AIR;
  }
  private _maximumSpeed = Mover.INITIAL_MAXIMUM_SPEED;
  private get maximumSpeed() {
    if (this.isOnFloor) {
      return this._maximumSpeed;
    }
    return this._maximumSpeed * Mover.ACCELERATION_RATE_IN_AIR;
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

  private accelerate(pressedDirections: Directions) {
    const { maximumSpeed, acceleration } = this;

    const nextXVelocity = this.xVelocity + acceleration * pressedDirections;
    if (Math.abs(nextXVelocity) >= maximumSpeed) {
      this.xVelocity = maximumSpeed * pressedDirections;
      return;
    }

    this.xVelocity = nextXVelocity;
  }

  private setIsJumping(isPressedUp: boolean) {
    if (!isPressedUp) {
      this.isJumping = false;
      return;
    }

    this.isJumping = this.isOnFloor;
  }

  private moveUp(isPressedUp: boolean) {
    this.setIsJumping(isPressedUp);

    if (!this.isJumping) {
      return;
    }
    this.gravitationalForce -= 5;
  }

  private moveSide() {
    this.x += this.xVelocity;
  }

  move(keyboard: Keyboard) {
    const pressedDirections = this.getPressedDirections(keyboard);
    if (pressedDirections) {
      this.directions = pressedDirections;
      this.accelerate(pressedDirections);
    }
    if (Math.sign(this.directions) !== Math.sign(this.xVelocity)) {
      this.decelerate();
    }
    this.moveSide();

    // FIXME: 점프
    // const { isPressedUp } = keyboard;

    // this.moveSide(pressedDirections);
    // this.moveUp(isPressedUp);
  }
}

export default Mover;
