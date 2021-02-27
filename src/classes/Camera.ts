import Rectangle from './Rectangle';
import Shape from './Shape';

export default class Camera extends Rectangle {
  private readonly WORLD;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    worldWidth: number,
    worldHeight: number,
    private followed?: Shape
  ) {
    // 적합한 뷰포트 크기 설정
    super(
      0,
      0,
      Math.min(canvasWidth, worldWidth),
      Math.min(canvasHeight, worldHeight)
    );

    this.WORLD = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  follow() {
    const { followed } = this;
    if (!followed) {
      return;
    }

    const { x: followedX, y: followedY } = followed;

    const { x, width, halfWidth } = this;
    if (followedX - x + halfWidth > width) {
      this.x = followedX - (width - halfWidth);
    } else if (followedX - halfWidth < width) {
      this.x = followedX - halfWidth;
    }

    const { y, height, halfHeight } = this;
    if (followedY - y + halfHeight > height) {
      this.y = followedY - (height - halfHeight);
    } else if (followedY - halfHeight < y) {
      this.y = followedY - halfHeight;
    }
  }
}
