import Mover from './Mover';

class Gravity {
  private static readonly INITIAL_SPEED = 0;
  private static readonly INITIAL_FORCE = 0.05;

  private gravitableMovers: {
    mover: Mover;
    speed: number;
  }[] = [];

  constructor(private force = Gravity.INITIAL_FORCE) {}

  registerMover(mover: Mover) {
    this.gravitableMovers.push({
      mover,
      speed: Gravity.INITIAL_SPEED,
    });
  }

  operate() {
    this.gravitableMovers.forEach((gravitableMover) => {
      gravitableMover.speed += this.force;
      gravitableMover.mover.y += gravitableMover.speed;
    });
  }
}

export default Gravity;
