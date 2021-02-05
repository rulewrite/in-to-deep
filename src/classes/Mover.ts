import CanvasComponent from './CanvasComponent';
import Floor from './Floor';
import Keyboard from './Keyboard';

type Directions = 'LEFT' | 'RIGHT';

class Mover extends CanvasComponent {
  private static readonly INITIAL_ACCELERATION = 0.14;
  private static readonly INITIAL_MAXIMUM_SPEED = 5;
  private static readonly DECELERATION_SPEED_IN_AIR = 0.1;
  private static readonly ACCELERATION_RATE_IN_AIR = 0.3;

  directions: Directions = 'RIGHT';
  gravitationalForce = 0;
  isOnFloor = false;
  isJumping = false;
  speed = 0;

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

  private getPressedDirections(keyboard: Keyboard): Directions | undefined {
    const { isPressedRight, isPressedLeft, isPressedMovingKey } = keyboard;

    if (!isPressedMovingKey || (isPressedRight && isPressedLeft)) {
      return;
    }

    if (isPressedRight && !isPressedLeft) {
      return 'RIGHT';
    }

    if (isPressedLeft && !isPressedRight) {
      return 'LEFT';
    }
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

  private moveSide(floors: Floor[], pressedDirections?: Directions) {
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

  move(keyboard: Keyboard, floors: Floor[]) {
    const pressedDirections = this.getPressedDirections(keyboard);
    const { isPressedUp } = keyboard;

    this.moveSide(floors, pressedDirections);
    this.moveUp(isPressedUp);
  }
}

export default Mover;
