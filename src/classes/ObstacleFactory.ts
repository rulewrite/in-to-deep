import CanvasComponent from './CanvasComponent';
import Platform from './Platform';

class ObstacleFactory {
  private static readonly GAP_MARGIN = 100;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private readonly minimumWidth: number;
  private readonly maximumWidth: number;
  private get width() {
    return ObstacleFactory.getRandomRangeValue(
      this.minimumWidth,
      this.maximumWidth
    );
  }
  private readonly minimumGap: number;

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    passer: CanvasComponent
  ) {
    const widthWithMargin = ObstacleFactory.GAP_MARGIN + passer.width;
    this.minimumWidth = this.minimumGap = widthWithMargin;
    this.maximumWidth = canvasWidth - this.minimumWidth - this.minimumGap;
  }

  generation() {
    const { width } = this;
    const leftFloor = new Platform(0, this.canvasHeight, width);

    const maximumGap = this.canvasWidth - width - this.minimumWidth;
    const gap = ObstacleFactory.getRandomRangeValue(
      this.minimumGap,
      maximumGap
    );

    const rightFloorX = width + gap;
    const rightFloorWidth = this.canvasWidth - rightFloorX;
    const rightFloor = new Platform(
      rightFloorX,
      this.canvasHeight,
      rightFloorWidth
    );

    return [leftFloor, rightFloor];
  }
}

export default ObstacleFactory;
