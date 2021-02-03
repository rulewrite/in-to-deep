import Floor from './Floor';
import Mover from './Mover';

class Gravity {
  private static readonly INITIAL_SPEED = 0;
  private static readonly INITIAL_FORCE = 0.05;

  constructor(private mover: Mover, private force = Gravity.INITIAL_FORCE) {}

  realize(floors: Floor[]) {
    this.mover.gravitationalForce += this.force;
    this.mover.y += this.mover.gravitationalForce;

    const hitFloor = floors.find((floor) => floor.isHitTopBy(this.mover));
    if (hitFloor) {
      this.mover.gravitationalForce = Gravity.INITIAL_SPEED;
      this.mover.y = hitFloor.getGapWith(this.mover);
      return;
    }
  }
}

export default Gravity;
