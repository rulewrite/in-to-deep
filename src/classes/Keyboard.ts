class Keyboard {
  private static readonly KEYDOWN_EVENT_TYPE = 'keydown';
  private static readonly SET_LEFT_KEY = new Set(['Left', 'ArrowLeft']);
  private static readonly SET_RIGHT_KEY = new Set(['Right', 'ArrowRight']);
  private static readonly SET_UP_KEY = new Set(['Up', 'ArrowUp']);

  isPressedLeft = false;
  isPressedRight = false;
  isPressedUp = false;
  get isPressedMovingKey() {
    return this.isPressedLeft || this.isPressedRight;
  }

  constructor() {
    this.keyListener = this.keyListener.bind(this);
    document.addEventListener('keydown', this.keyListener, false);
    document.addEventListener('keyup', this.keyListener, false);
  }

  private keyListener(event: KeyboardEvent) {
    const { key, type } = event;
    const isPressed = type === Keyboard.KEYDOWN_EVENT_TYPE;

    if (Keyboard.SET_LEFT_KEY.has(key)) {
      this.isPressedLeft = isPressed;
    }

    if (Keyboard.SET_RIGHT_KEY.has(key)) {
      this.isPressedRight = isPressed;
    }

    if (Keyboard.SET_UP_KEY.has(key)) {
      this.isPressedUp = isPressed;
    }
  }
}

export default Keyboard;
