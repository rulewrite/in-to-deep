import Obstacle from './Obstacle';
import Platforms from './Platforms';

export default class CycleObstacles {
  private static readonly INITIAL_GENERATION_INTERVAL = 180;

  private frameNo = 0;
  private get isGenerationTime() {
    if (this.frameNo === 1) {
      return true;
    }
    return !((this.frameNo / this.GENERATION_INTERVAL) % 1);
  }

  constructor(
    private readonly CANVAS_WIDTH: number,
    private readonly CANVAS_HEIGHT: number,
    private readonly PASSER_WIDTH: number,
    private readonly PLATFORMS: Platforms,
    private readonly GENERATION_INTERVAL = CycleObstacles.INITIAL_GENERATION_INTERVAL
  ) {}

  generate() {
    this.frameNo += 1;

    if (this.isGenerationTime) {
      const obstacle = new Obstacle(
        this.CANVAS_WIDTH,
        this.CANVAS_HEIGHT,
        this.PASSER_WIDTH
      );
      this.PLATFORMS.push(obstacle.LEFT_PLATFORM);
      this.PLATFORMS.push(obstacle.RIGHT_PLATFORM);
    }
  }
}
