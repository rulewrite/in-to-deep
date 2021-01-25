import Mover from './Mover';

class Floor {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';

  private height = Floor.INITIAL_HEIGHT;
  constructor(private x: number, private y: number, private width: number) {}

  update(context: CanvasRenderingContext2D) {
    context.fillStyle = Floor.INITIAL_COLOR;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  isHitTopBy(mover: Mover) {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;

    const moverLeft = mover.x;
    const moverRight = mover.x + mover.width;
    const moverTop = mover.y;
    const moverBottom = mover.y + mover.height;

    if (left > moverRight) {
      return false;
    }

    if (right < moverLeft) {
      return false;
    }

    if (top < moverTop) {
      return false;
    }

    return top <= moverBottom;
  }

  getGapWith(mover: Mover) {
    return this.y - mover.height;
  }
}

export default Floor;
