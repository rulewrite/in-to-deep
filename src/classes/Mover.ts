import CanvasComponent from './CanvasComponent';
import Keyboard from './Keyboard';

export enum SideDirections {
  RIGHT = 1,
  LEFT = -1,
}

class Mover extends CanvasComponent {
  private static readonly INITIAL_ACCELERATION = 0.14;
  private static readonly INITIAL_DECELERATION = 0.5;
  private static readonly INITIAL_MAXIMUM_X_VELOCITY = 5;
  private static readonly INITIAL_MAXIMUM_Y_VELOCITY = 5;
  private static readonly AIR_RESISTANCE = 0.3;

  sideDirection: SideDirections = SideDirections.RIGHT;
  xVelocity = 0;
  yVelocity = 0;
  isJumping = false;
  isGrounded = false;

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
    if (this.isGrounded) {
      return force;
    }
    return force * Mover.AIR_RESISTANCE;
  }

  private sideDecelerate() {
    const { xVelocity, deceleration } = this;

    const nextXVelocity = xVelocity + -Math.sign(xVelocity) * deceleration;
    if (xVelocity > 0) {
      this.xVelocity = Math.max(nextXVelocity, 0);
      return;
    }
    this.xVelocity = Math.min(nextXVelocity, 0);
  }

  private sideAccelerate() {
    const { xVelocity, maximumXVelocity, acceleration, sideDirection } = this;

    const nextXVelocity = xVelocity + acceleration * sideDirection;
    if (Math.abs(nextXVelocity) < maximumXVelocity) {
      this.xVelocity = nextXVelocity;
      return;
    }
    this.xVelocity = maximumXVelocity * sideDirection;
  }

  updateXVelocity(sideDirection: SideDirections | 0) {
    if (sideDirection) {
      this.sideDirection = sideDirection;
      this.sideAccelerate();
    }

    if (
      Math.sign(sideDirection) !== Math.sign(this.xVelocity) &&
      this.xVelocity
    ) {
      this.sideDecelerate();
    }
  }

  updateYVelocity() {
    if (!this.isGrounded || this.isJumping) {
      return;
    }

    this.isJumping = true;
    this.yVelocity = -this.maximumYVelocity;
  }

  move() {
    this.x += this.xVelocity;
  }
}

export default Mover;
