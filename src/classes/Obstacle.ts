import Platform from './Platform';

export default class Obstacle {
  private static readonly MARGIN_MULTIPLE = 2;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  readonly LEFT: Platform;
  readonly RIGHT: Platform;

  constructor(width: number, y: number, passerWidth: number) {
    const minumumGap = passerWidth * Obstacle.MARGIN_MULTIPLE;

    const leftPlatformWidth = Obstacle.getRandomRangeValue(
      passerWidth,
      width - minumumGap - passerWidth
    );
    this.LEFT = new Platform(0, y, leftPlatformWidth);

    const gap = Obstacle.getRandomRangeValue(
      minumumGap,
      width - leftPlatformWidth - passerWidth
    );

    const rightPlatformX = leftPlatformWidth + gap;
    this.RIGHT = new Platform(rightPlatformX, y, width - rightPlatformX);
  }
}
