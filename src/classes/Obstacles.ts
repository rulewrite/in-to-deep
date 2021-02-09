import Platform from './Platform';
import ObstacleFactory from './ObstacleFactory';

class Obstacles {
  private static readonly INITIAL_GENERATION_INTERVAL = 180;

  private frameNo = 0;
  private get isGenerationTime() {
    if (this.frameNo === 1) {
      return true;
    }
    return !((this.frameNo / this.GENERATION_INTERVAL) % 1);
  }

  platforms: Platform[] = [];

  constructor(
    private readonly OBSTACLE_FACTORY: ObstacleFactory,
    private readonly GENERATION_INTERVAL = Obstacles.INITIAL_GENERATION_INTERVAL
  ) {}

  update() {
    this.frameNo += 1;

    this.platforms = this.platforms.filter((platform) => {
      return platform.bottom > 0;
    });

    if (this.isGenerationTime) {
      this.platforms = this.platforms.concat(
        this.OBSTACLE_FACTORY.generation()
      );
    }
  }
}

export default Obstacles;
