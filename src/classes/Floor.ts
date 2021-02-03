import CanvasComponent from './CanvasComponent';

class Floor extends CanvasComponent {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';

  constructor(
    x: number,
    y: number,
    width: number,
    color = Floor.INITIAL_COLOR
  ) {
    super(x, y, width, Floor.INITIAL_HEIGHT, color);
  }

  isHitBy(otherComponent: CanvasComponent) {
    const { left, right, top, bottom } = this;
    const {
      left: otherLeft,
      right: otherRight,
      top: otherTop,
      bottom: otherBottom,
    } = otherComponent;

    if (
      bottom < otherTop ||
      top > otherBottom ||
      right < otherLeft ||
      left > otherRight
    ) {
      return false;
    }
    return true;
  }

  getGapWith(otherComponent: CanvasComponent) {
    return this.y - otherComponent.height;
  }
}

export default Floor;
