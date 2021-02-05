import Mover from './Mover';

class Gravity {
  private static readonly INITIAL_FORCE = 0.1;

  constructor(private mover: Mover, private force = Gravity.INITIAL_FORCE) {}

  realize() {
    this.mover.gravitationalForce += this.force;
    this.mover.y += this.mover.gravitationalForce;
  }
}

export default Gravity;
