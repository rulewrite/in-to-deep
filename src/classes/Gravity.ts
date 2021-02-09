import Mover from './Mover';

class Gravity {
  private static readonly INITIAL_FORCE = 0.1;

  constructor(
    private readonly MOVER: Mover,
    private force = Gravity.INITIAL_FORCE
  ) {}

  realize() {
    this.MOVER.yVelocity += this.force;
    this.MOVER.y += this.MOVER.yVelocity;
  }
}

export default Gravity;
