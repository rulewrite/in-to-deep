import Mover from './Mover';

export default class Area {
  constructor(
    public width: number,
    public height: number,
    private mover: Mover
  ) {}

  detect() {
    const { left, right } = this.mover;
    if (left < 0) {
      this.mover.x = 0;
    }

    if (right > this.width) {
      this.mover.x = this.width - this.mover.width;
    }
  }
}
