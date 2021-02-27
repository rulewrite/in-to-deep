import Hero from './Hero';
import Keyboard from './Keyboard';

export default class Controller {
  private static readonly KEYBOARD = new Keyboard();

  constructor(private readonly HERO: Hero) {}

  interact() {
    const { isPressedRight, isPressedLeft, isPressedZ } = Controller.KEYBOARD;

    if (isPressedRight && !isPressedLeft) {
      this.HERO.go('RIGHT');
    }

    if (isPressedLeft && !isPressedRight) {
      this.HERO.go('LEFT');
    }

    if (isPressedZ) {
      this.HERO.jump();
    }
  }
}
