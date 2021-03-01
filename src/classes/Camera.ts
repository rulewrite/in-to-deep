import Shape from './Shape';

export default class Camera extends Shape {
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    world: Shape,
    private followed: Shape
  ) {
    // 적합한 뷰포트 크기 설정
    super(
      0,
      0,
      Math.min(canvasWidth, world.width),
      Math.min(canvasHeight, world.height)
    );
  }

  follow() {
    const {
      followed: { x: followedX, y: followedY },
    } = this;

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
