import Keyboard from './Keyboard';
import Mover from './Mover';

export default class Controller {
  private static readonly KEYBOARD = new Keyboard();

  constructor(private readonly MOVER: Mover) {}

  interact() {
    const { isPressedRight, isPressedLeft, isPressedUp } = Controller.KEYBOARD;

    if (isPressedRight && !isPressedLeft) {
      this.MOVER.go('RIGHT');
    }

    if (isPressedLeft && !isPressedRight) {
      this.MOVER.go('LEFT');
    }

    if (isPressedUp) {
      this.MOVER.jump();
    }
  }
}