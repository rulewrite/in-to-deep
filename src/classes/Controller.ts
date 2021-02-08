import Keyboard from './Keyboard';
import Mover, { SideDirections } from './Mover';

export default class Controller {
  private static readonly KEYBOARD = new Keyboard();

  constructor(private readonly MOVER: Mover) {}

  interact() {
    const { isPressedRight, isPressedLeft, isPressedUp } = Controller.KEYBOARD;

    if (isPressedRight && !isPressedLeft) {
      this.MOVER.updateXVelocity(SideDirections.RIGHT);
    }

    if (isPressedLeft && !isPressedRight) {
      this.MOVER.updateXVelocity(SideDirections.LEFT);
    }

    if (!isPressedRight && !isPressedLeft) {
      this.MOVER.updateXVelocity(0);
    }

    if (isPressedUp) {
      this.MOVER.updateYVelocity();
    }
  }
}
