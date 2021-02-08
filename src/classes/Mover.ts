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
    const { xVelocity, deceleration } = this;

    const nextXVelocity = xVelocity + -Math.sign(xVelocity) * deceleration;
    if (xVelocity > 0) {
      this.xVelocity = Math.max(nextXVelocity, 0);
      return;
    }
    this.xVelocity = Math.min(nextXVelocity, 0);
  }

  private accelerate() {
    const { xVelocity, maximumXVelocity, acceleration, directions } = this;

    const nextXVelocity = xVelocity + acceleration * directions;
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
    if (
      Math.sign(pressedDirections) !== Math.sign(this.xVelocity) &&
      this.xVelocity
    ) {
      this.decelerate();
    }
    this.moveSide();

    if (keyboard.isPressedUp && this.isGrounded && !this.isJumping) {
      this.isJumping = true;
      this.moveUp();
    }
  }
}

export default Mover;
