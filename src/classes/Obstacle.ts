import Platform from './Platform';

export default class Obstacle {
  private static readonly LEFT_PLATFORM_X = 0;
  private static readonly HEIGHT = 20;
  private static readonly MARGIN_MULTIPLE = 2;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  readonly LEFT_PLATFORM: Platform;
  readonly RIGHT_PLATFORM: Platform;

  constructor(width: number, y: number, passerWidth: number) {
    const minumumGap = passerWidth * Obstacle.MARGIN_MULTIPLE;

    const leftPlatformWidth = Obstacle.getRandomRangeValue(
      passerWidth,
      width - minumumGap - passerWidth
    );
    this.LEFT_PLATFORM = new Platform(
      Obstacle.LEFT_PLATFORM_X,
      y,
      leftPlatformWidth,
      Obstacle.HEIGHT,
      0,
      -1
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
      Obstacle.HEIGHT,
      0,
      -1
    );
  }
}
