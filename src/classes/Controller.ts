import Keyboard from './Keyboard';
import Mover, { SideDirections } from './Mover';

export default class Controller {
  private static readonly KEYBOARD = new Keyboard();

  constructor(private readonly MOVER: Mover) {}

  interact() {
    const { isPressedRight, isPressedLeft, isPressedUp } = Controller.KEYBOARD;

    if (isPressedRight && !isPressedLeft) {
      this.MOVER.go(SideDirections.RIGHT);
    }

    if (isPressedLeft && !isPressedRight) {
      this.MOVER.go(SideDirections.LEFT);
    }

    if (isPressedUp) {
      this.MOVER.jump();
    }
  }
}
