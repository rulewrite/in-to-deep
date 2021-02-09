import Mover from './Mover';

export default class Area {
  constructor(
    private readonly WIDTH: number,
    private readonly HEIGHT: number
  ) {}

  block(mover: Mover) {
    const { WIDTH, HEIGHT } = this;
    const { left, right, bottom } = mover;

    if (left < 0) {
      mover.x = 0;
    }

    if (right > WIDTH) {
      mover.x = WIDTH - mover.width;
    }

    if (bottom > HEIGHT) {
      mover.y = HEIGHT - mover.height;
    }
  }

  isHitDeadlineBy(mover: Mover): boolean {
    const { HEIGHT } = this;
    const { bottom } = mover;

    return bottom >= HEIGHT;
  }
}
