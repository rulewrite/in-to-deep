import CanvasComponent from './CanvasComponent';

class Floor extends CanvasComponent {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';

  constructor(x: number, y: number, width: number) {
    super(x, y, width, Floor.INITIAL_HEIGHT, Floor.INITIAL_COLOR);
  }

  isHitTopBy(otherComponent: CanvasComponent) {
    const { left, right, top } = this;
    const {
      left: otherLeft,
      right: otherRight,
      top: otherTop,
      bottom: otherBottom,
    } = otherComponent;

    if (left >= otherRight) {
      return false;
    }

    if (right <= otherLeft) {
      return false;
    }

    if (top <= otherTop) {
      return false;
    }

    return top <= otherBottom;
  }

  getGapWith(otherComponent: CanvasComponent) {
    return this.y - otherComponent.height;
  }
}

export default Floor;
