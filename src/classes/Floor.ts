import CanvasComponent from './CanvasComponent';
import Mover from './Mover';
import { v4 as uuidv4 } from 'uuid';

class Floor extends CanvasComponent {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';

  id = uuidv4();
  constructor(
    x: number,
    y: number,
    width: number,
    color = Floor.INITIAL_COLOR
  ) {
    super(x, y, width, Floor.INITIAL_HEIGHT, color);
  }

  private isHitSideBy(mover: Mover) {
    const { left, right, top, bottom } = this;
    const {
      left: moverLeft,
      right: moverRight,
      top: moverTop,
      bottom: moverBottom,
      isJumping,
    } = mover;

    const moverIsUnder = bottom <= moverTop;
    if (moverIsUnder) {
      return false;
    }

    const moverIsOver = top >= moverBottom;
    if (moverIsOver) {
      return false;
    }

    if (isJumping) {
      return false;
    }

    const isHitLeft = left < moverRight;
    const isHitRight = right > moverLeft;
    return isHitLeft && isHitRight;
  }

  private getGapSideWith(mover: Mover) {
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

  private isHitTopBy(mover: Mover) {
    const { left, right, top } = this;
    const {
      left: moverLeft,
      right: moverRight,
      top: moverTop,
      bottom: moverBottom,
      isJumping,
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

    if (isJumping) {
      return false;
    }

    return top <= moverBottom;
  }

  private getGapTopWith(mover: Mover) {
    return this.y - mover.height;
  }

  repel(mover: Mover) {
    const isHitTop = this.isHitTopBy(mover);
    isHitTop ? mover.onFloors.add(this.id) : mover.onFloors.delete(this.id);
    if (isHitTop) {
      mover.gravitationalForce = 0;
      mover.y = this.getGapTopWith(mover);
    }

    const isHitSide = this.isHitSideBy(mover);
    if (isHitSide) {
      mover.speed = 0;
      mover.x = this.getGapSideWith(mover);
    }
  }
}

export default Floor;
