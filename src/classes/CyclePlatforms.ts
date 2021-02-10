import Platform from './Platform';
import PlatformFactory from './PlatformFactory';
import Mover from './Mover';
import Scroll from './Scroll';

export default class CyclePlatforms {
  private static readonly INITIAL_GENERATION_INTERVAL = 180;

  private frameNo = 0;
  private get isGenerationTime() {
    if (this.frameNo === 1) {
      return true;
    }
    return !((this.frameNo / this.GENERATION_INTERVAL) % 1);
  }

  private platforms: Platform[] = [];

  constructor(
    private readonly PLATFORM_FACTORY: PlatformFactory,
    private readonly SCROLL: Scroll,
    private readonly GENERATION_INTERVAL = CyclePlatforms.INITIAL_GENERATION_INTERVAL
  ) {}

  update() {
    this.frameNo += 1;

    this.platforms = this.platforms.filter((platform) => {
      return platform.bottom > 0;
    });

    if (this.isGenerationTime) {
      this.platforms = this.platforms.concat(
        this.PLATFORM_FACTORY.generation()
      );
    }

    this.SCROLL.wind(this.platforms);
  }

  draw(context: CanvasRenderingContext2D) {
    this.platforms.forEach((platform) => platform.draw(context));
  }

  collision(mover: Mover) {
    this.platforms.forEach((platforms) => {
      const collisionDirection = platforms.repel(mover);
      if (!collisionDirection) {
        return;
      }

      mover.collision(collisionDirection);
    });
  }
}
