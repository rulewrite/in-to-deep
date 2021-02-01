class Controller {
  static readonly SET_LEFT_KEY = new Set(['Left', 'ArrowLeft']);
  static readonly SET_RIGHT_KEY = new Set(['Right', 'ArrowRight']);

  isPressedLeft = false;
  isPressedRight = false;
  get isPressedMovingKey() {
    return this.isPressedLeft || this.isPressedRight;
  }

  constructor() {
    document.addEventListener(
      'keydown',
      ({ key }) => {
        if (Controller.SET_LEFT_KEY.has(key)) {
          this.isPressedLeft = true;
          return;
        }

        if (Controller.SET_RIGHT_KEY.has(key)) {
          this.isPressedRight = true;
          return;
        }
      },
      false
    );

    document.addEventListener(
      'keyup',
      ({ key }) => {
        if (Controller.SET_LEFT_KEY.has(key)) {
          this.isPressedLeft = false;
          return;
        }

        if (Controller.SET_RIGHT_KEY.has(key)) {
          this.isPressedRight = false;
          return;
        }
      },
      false
    );
  }
}

export default Controller;
