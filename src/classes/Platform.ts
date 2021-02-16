import CanvasComponent from './CanvasComponent';
import Mover from './Mover';

export default class Platform extends CanvasComponent {
  private static readonly INITIAL_HEIGHT = 20;
  private static readonly INITIAL_COLOR = 'black';
  private static getCollisionDirection(
    outX: number,
    outY: number,
    vectorX: number,
    vectorY: number
  ) {
    if (outX >= outY) {
      if (vectorY > 0) {
        return 'TOP';
      }

      return 'BOTTOM';
    }

    if (vectorX > 0) {
      return 'LEFT';
    }

    return 'RIGHT';
  }

  constructor(
    x: number,
    y: number,
    width: number,
    color = Platform.INITIAL_COLOR
  ) {
    super(x, y, width, Platform.INITIAL_HEIGHT, color);
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

    const collisionDirection = Platform.getCollisionDirection(
      outX,
      outY,
      vectorX,
      vectorY
    );

    switch (collisionDirection) {
      case 'TOP':
        mover.y += outY;
        break;
      case 'BOTTOM':
        mover.y -= outY;
        break;
      case 'LEFT':
        mover.x += outX;
        break;
      case 'RIGHT':
        mover.x -= outX;
        break;
    }

    return collisionDirection;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
