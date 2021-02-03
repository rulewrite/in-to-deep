import CanvasComponent from './CanvasComponent';
import Mover from './Mover';

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

  isHitSideBy(mover: Mover) {
    const { left, right, top, bottom } = this;
    const {
      left: moverLeft,
      right: moverRight,
      top: moverTop,
      bottom: moverBottom,
    } = mover;

    const moverIsUnder = bottom <= moverTop;
    if (moverIsUnder) {
      return false;
    }

    const moverIsOver = top >= moverBottom;
    if (moverIsOver) {
      return false;
    }

    const isHitLeft = left < moverRight;
    const isHitRight = right > moverLeft;
    return isHitLeft && isHitRight;
  }

  getGapSideWith(mover: Mover) {
    const { left, right } = this;
    const { directions } = mover;

    if (directions === 'RIGHT') {
      return left - mover.width;
    }

    if (directions === 'LEFT') {
      return right;
    }

    return mover.x;
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

  getGapTopWith(mover: CanvasComponent) {
    return this.y - mover.height;
  }
}

export default Floor;
