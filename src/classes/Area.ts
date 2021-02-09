import CanvasComponent from './CanvasComponent';

export default class Area {
  constructor(private width: number, private height: number) {}

  block(otherComponent: CanvasComponent) {
    const { width, height } = this;
    const { left, right, top, bottom } = otherComponent;

    if (left < 0) {
      otherComponent.x = 0;
    }

    if (right > width) {
      otherComponent.x = width - otherComponent.width;
    }

    if (top < 0) {
      otherComponent.y = 0;
    }

    if (bottom > height) {
      otherComponent.y = height - otherComponent.height;
    }
  }

  isHitDeadlineBy(otherComponent: CanvasComponent): boolean {
    const { height } = this;
    const { top, bottom } = otherComponent;

    return top <= 0 || bottom >= height;
  }
}
