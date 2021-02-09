import Mover from './Mover';

class Gravity {
  private static readonly INITIAL_FORCE = 0.1;

  constructor(private mover: Mover, private force = Gravity.INITIAL_FORCE) {}

  realize() {
    this.mover.yVelocity += this.force;
    this.mover.y += this.mover.yVelocity;
  }
}

export default Gravity;
