import CanvasComponent from './CanvasComponent';

export default class Area {
  center: number;
  middle: number;

  constructor(public width: number, public height: number) {
    this.center = width / 2;
    this.middle = height / 2;
  }

  blockSide(otherComponent: CanvasComponent) {
    const { width } = this;
    const { left, right } = otherComponent;

    if (left < 0) {
      otherComponent.x = 0;
    }

    if (right > width) {
      otherComponent.x = width - otherComponent.width;
    }
  }

  isHitDeadlineBy(otherComponent: CanvasComponent): boolean {
    const { height } = this;
    const { top, bottom } = otherComponent;

    return top < 0 || bottom > height;
  }

  isHitEdgeBy(otherComponent: CanvasComponent): boolean {
    if (this.isHitDeadlineBy(otherComponent)) {
      return true;
    }

    const { width } = this;
    const { left, right } = otherComponent;

    return left < 0 || right > width;
  }
}
