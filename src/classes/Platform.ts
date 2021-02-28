import Mover from './Mover';
import Drawable from '@interfaces/Drawable';
import Hero from './Hero';

export default class Platform extends Mover implements Drawable {
  private static readonly INITIAL_COLOR = 'black';
  private static getCollisionDirection(
    outX: number,
    outY: number,
    vectorX: number,
    vectorY: number
  ): CollisionDirection {
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

  get isDestory() {
    return this.bottom <= 0;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    xVelocity = 0,
    yVelocity = 0,
    private color = Platform.INITIAL_COLOR
  ) {
    super(x, y, width, height, xVelocity, yVelocity);
  }

  repel(hero: Hero) {
    const { top, left, halfWidth, halfHeight } = this;
    const {
      left: heroLeft,
      top: heroTop,
      halfWidth: heroHalfWidth,
      halfHeight: heroHalfHeight,
    } = hero;

    const vectorX = heroLeft + heroHalfWidth - left - halfWidth;
    const vectorY = heroTop + heroHalfHeight - top - halfHeight;
    const halfWidths = heroHalfWidth + halfWidth;
    const halfHeights = heroHalfHeight + halfHeight;

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
        hero.y += outY;
        break;
      case 'BOTTOM':
        hero.y -= outY;
        break;
      case 'LEFT':
        hero.x += outX;
        break;
      case 'RIGHT':
        hero.x -= outX;
        break;
    }

    hero.collide(collisionDirection);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
