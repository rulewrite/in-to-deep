import CanvasComponent from './CanvasComponent';

enum SideDirections {
  RIGHT = 1,
  LEFT = -1,
}

type SideDirectionStrings = keyof typeof SideDirections;

class Mover extends CanvasComponent {
  private static readonly INITIAL_ACCELERATION = 1;
  private static readonly INITIAL_MAXIMUM_X_VELOCITY = 5;
  private static readonly INITIAL_JUMP_POWER = 4;

  private _sideDirection: SideDirections = SideDirections.RIGHT;
  protected get sideDirection() {
    return SideDirections[this._sideDirection] as SideDirectionStrings;
  }
  xVelocity = 0;
  yVelocity = 0;
  isJumping = false;
  isGrounded = false;
  private acceleration = Mover.INITIAL_ACCELERATION;
  private maximumXVelocity = Mover.INITIAL_MAXIMUM_X_VELOCITY;
  private jumpPower = Mover.INITIAL_JUMP_POWER;

  go(sideDirection: SideDirectionStrings) {
    this._sideDirection = SideDirections[sideDirection];
    if (Math.abs(this.xVelocity) > this.maximumXVelocity) {
      return;
    }
    this.xVelocity += this._sideDirection * this.acceleration;
  }

  jump() {
    if (!this.isGrounded || this.isJumping) {
      return;
    }

    this.isJumping = true;
    this.isGrounded = false;
    this.yVelocity = -this.jumpPower;
  }

  move() {
    this.xVelocity *= 0.8; // 마찰력

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Mover;
