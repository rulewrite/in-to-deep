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

  isHitBy(mover: CanvasComponent) {
    const { left, right, top, bottom } = this;
    const {
      left: moverLeft,
      right: moverRight,
      top: moverTop,
      bottom: moverBottom,
    } = mover;

    if (
      bottom <= moverTop ||
      top >= moverBottom ||
      right <= moverLeft ||
      left >= moverRight
    ) {
      return false;
    }
    return true;
  }

  isHitTopBy(mover: CanvasComponent) {
    const { left, right, top } = this;
    const {
      left: moverLeft,
      right: moverRight,
      top: moverTop,
      bottom: moverBottom,
    } = mover;

    const moverIsUnder = top <= moverTop;
    if (moverIsUnder) {
      return false;
    }

    const moverIsLeftSide = left >= moverRight;
    if (moverIsLeftSide) {
      return false;
    }

    const moverIsRightSide = right <= moverLeft;
    if (moverIsRightSide) {
      return false;
    }

    return top <= moverBottom;
  }

  getGapWith(mover: CanvasComponent) {
    return this.y - mover.height;
  }
}

export default Floor;
