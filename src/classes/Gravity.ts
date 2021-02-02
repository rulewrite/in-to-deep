import Floor from './Floor';
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

  operate(floors: Floor[]) {
    this.gravitableMovers.forEach((gravitableMover) => {
      const hitFloor = floors.find((floor) =>
        floor.isHitBy(gravitableMover.mover)
      );
      if (hitFloor) {
        gravitableMover.speed = Gravity.INITIAL_SPEED;
        gravitableMover.mover.y = hitFloor.getGapWith(gravitableMover.mover);
        return;
      }

      gravitableMover.speed += this.force;
      gravitableMover.mover.y += gravitableMover.speed;
    });
  }
}

export default Gravity;
