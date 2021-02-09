import CanvasComponent from './CanvasComponent';
import Platform from './Platform';

export default class PlatformFactory {
  private static readonly GAP_MARGIN = 100;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private readonly MINIMUM_WIDTH: number;
  private readonly MAXIMUM_WIDTH: number;
  private get width() {
    return PlatformFactory.getRandomRangeValue(
      this.MINIMUM_WIDTH,
      this.MAXIMUM_WIDTH
    );
  }
  private readonly MINIMUM_GAP: number;

  constructor(
    private readonly CANVAS_WIDTH: number,
    private readonly CANVAS_HEIGHT: number,
    passer: CanvasComponent
  ) {
    const widthWithMargin = PlatformFactory.GAP_MARGIN + passer.width;
    this.MINIMUM_WIDTH = this.MINIMUM_GAP = widthWithMargin;
    this.MAXIMUM_WIDTH = CANVAS_WIDTH - this.MINIMUM_WIDTH - this.MINIMUM_GAP;
  }

  generation() {
    const { width } = this;
    const leftPlatform = new Platform(0, this.CANVAS_HEIGHT, width);

    const maximumGap = this.CANVAS_WIDTH - width - this.MINIMUM_WIDTH;
    const gap = PlatformFactory.getRandomRangeValue(
      this.MINIMUM_GAP,
      maximumGap
    );

    const rightPlatformX = width + gap;
    const rightPlatformWidth = this.CANVAS_WIDTH - rightPlatformX;
    const rightPlatform = new Platform(
      rightPlatformX,
      this.CANVAS_HEIGHT,
      rightPlatformWidth
    );

    return [leftPlatform, rightPlatform];
  }
}
