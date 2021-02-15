import Mover from './Mover';

export default class Area {
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

  isHitDeadline(): boolean {
    return this.MOVER.bottom >= this.HEIGHT;
  }
}
