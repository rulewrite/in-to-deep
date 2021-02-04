import Floor from './Floor';
import ObstacleFactory from './ObstacleFactory';

class Obstacles {
  private static readonly INITIAL_GENERATION_INTERVAL = 180;

  private frameNo = 0;
  private get isGenerationTime() {
    if (this.frameNo === 1) {
      return true;
    }
    return !((this.frameNo / this.generationInterval) % 1);
  }

  floors: Floor[] = [];

  constructor(
    private readonly obstacleFactory: ObstacleFactory,
    private readonly generationInterval = Obstacles.INITIAL_GENERATION_INTERVAL
  ) {}

  update() {
    this.frameNo += 1;

    this.floors = this.floors.filter((floor) => {
      return floor.bottom > 0;
    });

    if (this.isGenerationTime) {
      this.floors = this.floors.concat(this.obstacleFactory.generation());
    }
  }
}

export default Obstacles;
