import CanvasComponent from './CanvasComponent';
import Mover, { Directions } from './Mover';
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

  repel(mover: Mover) {
    const { top, left, halfWidth, halfHeight } = this;
    const {
      left: moverLeft,
      top: moverTop,
      halfWidth: moverHalfWidth,
      halfHeight: moverHalfHeight,
    } = mover;

    const vectorX = moverLeft + moverHalfWidth - left - halfWidth;
    const vectorY = moverTop + moverHalfHeight - top - halfHeight;
    const halfWidths = moverHalfWidth + halfWidth;
    const halfHeights = moverHalfHeight + halfHeight;

    const absoluteVectorX = Math.abs(vectorX);
    const absoluteVectorY = Math.abs(vectorY);
    if (absoluteVectorX >= halfWidths || absoluteVectorY >= halfHeights) {
      return;
    }

    const outX = halfWidths - absoluteVectorX;
    const outY = halfHeights - absoluteVectorY;

    if (outX >= outY) {
      if (vectorY > 0) {
        mover.y += outY;
        mover.yVelocity *= -1;
      } else {
        mover.y -= outY;
        mover.yVelocity = 0;
      }
      return;
    }

    if (vectorX > 0) {
      mover.x += outX;
    } else {
      mover.x -= outX;
    }
    mover.xVelocity = 0;
  }
}

export default Floor;
