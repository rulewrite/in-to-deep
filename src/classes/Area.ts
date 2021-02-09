import CanvasComponent from './CanvasComponent';

export default class Area {
  constructor(
    private readonly WIDTH: number,
    private readonly HEIGHT: number
  ) {}

  block(otherComponent: CanvasComponent) {
    const { WIDTH, HEIGHT } = this;
    const { left, right, top, bottom } = otherComponent;

    if (left < 0) {
      otherComponent.x = 0;
    }

    if (right > WIDTH) {
      otherComponent.x = WIDTH - otherComponent.width;
    }

    if (top < 0) {
      otherComponent.y = 0;
    }

    if (bottom > HEIGHT) {
      otherComponent.y = HEIGHT - otherComponent.height;
    }
  }

  isHitDeadlineBy(otherComponent: CanvasComponent): boolean {
    const { HEIGHT } = this;
    const { bottom } = otherComponent;

    return bottom >= HEIGHT;
  }
}
