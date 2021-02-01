import Mover from './Mover';
import CanvasComponent from './CanvasComponent';

class Floor extends CanvasComponent {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';

  constructor(x: number, y: number, width: number) {
    super(x, y, width, Floor.INITIAL_HEIGHT, Floor.INITIAL_COLOR);
  }

  isHitTopBy(mover: Mover) {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;

    const moverLeft = mover.x;
    const moverRight = mover.x + mover.width;
    const moverTop = mover.y;
    const moverBottom = mover.y + mover.height;

    if (left >= moverRight) {
      return false;
    }

    if (right <= moverLeft) {
      return false;
    }

    if (top <= moverTop) {
      return false;
    }

    return top <= moverBottom;
  }

  getGapWith(mover: Mover) {
    return this.y - mover.height;
  }
}

export default Floor;
