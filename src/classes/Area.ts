import Mover from './Mover';

export default class Area {
  private static readonly OVERFLOW_GUIDE_HEIGHT = 10;

  constructor(
    private readonly WIDTH: number,
    private readonly HEIGHT: number,
    private readonly MOVER: Mover
  ) {}

  block() {
    const { WIDTH, HEIGHT } = this;
    const { left, right, bottom } = this.MOVER;

    if (left < 0) {
      this.MOVER.x = 0;
    }

    if (right > WIDTH) {
      this.MOVER.x = WIDTH - this.MOVER.width;
    }

    if (bottom > HEIGHT) {
      this.MOVER.y = HEIGHT - this.MOVER.height;
    }
  }

  drawOverflowGuide(context: CanvasRenderingContext2D) {
    if (this.MOVER.bottom >= 0) {
      return;
    }

    const { color, center, left, right } = this.MOVER;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(center, 0);
    context.lineTo(left, Area.OVERFLOW_GUIDE_HEIGHT);
    context.lineTo(right, Area.OVERFLOW_GUIDE_HEIGHT);
    context.fill();
  }

  isHitDeadline(): boolean {
    return this.MOVER.bottom >= this.HEIGHT;
  }
}
