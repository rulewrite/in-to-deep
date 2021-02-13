export default class Keyboard {
  private static readonly KEYDOWN_EVENT_TYPE = 'keydown';
  private static readonly LEFT_KEY_CODE = 'ArrowLeft';
  private static readonly RIGHT_KEY_CODE = 'ArrowRight';
  private static readonly Z_KEY_CODE = 'KeyZ';

  isPressedLeft = false;
  isPressedRight = false;
  isPressedZ = false;

  constructor() {
    this.keyListener = this.keyListener.bind(this);
    document.addEventListener('keydown', this.keyListener, false);
    document.addEventListener('keyup', this.keyListener, false);
  }

  private keyListener(event: KeyboardEvent) {
    const { code, type } = event;
    const isPressed = type === Keyboard.KEYDOWN_EVENT_TYPE;

    if (Keyboard.LEFT_KEY_CODE === code) {
      this.isPressedLeft = isPressed;
    }

    if (Keyboard.RIGHT_KEY_CODE === code) {
      this.isPressedRight = isPressed;
    }

    if (Keyboard.Z_KEY_CODE === code) {
      this.isPressedZ = isPressed;
    }
  }
}
