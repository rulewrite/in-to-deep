import Platform from './Platform';
import Shape from './Shape';

export default class Obstacle extends Shape {
  private static readonly X = 0;
  private static readonly HEIGHT = 20;
  private static readonly MARGIN_MULTIPLE = 2;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  readonly LEFT_PLATFORM: Platform;
  readonly RIGHT_PLATFORM: Platform;

  constructor(width: number, y: number, passerWidth: number) {
    super(Obstacle.X, y, width, Obstacle.HEIGHT);

    const minumumGap = passerWidth * Obstacle.MARGIN_MULTIPLE;

    const leftPlatformWidth = Obstacle.getRandomRangeValue(
      passerWidth,
      width - minumumGap - passerWidth
    );
    this.LEFT_PLATFORM = new Platform(
      this.x,
      y,
      leftPlatformWidth,
      this.height
    );

    const gap = Obstacle.getRandomRangeValue(
      minumumGap,
      width - leftPlatformWidth - passerWidth
    );

    const rightPlatformX = leftPlatformWidth + gap;
    this.RIGHT_PLATFORM = new Platform(
      rightPlatformX,
      y,
      width - rightPlatformX,
      this.height
    );
  }
}
