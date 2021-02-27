import Platform from './Platform';
import Obstacle from './Obstacle';
import Drawable from '@interfaces/Drawable';
import Hero from './Hero';

export default class CycleObstacles implements Drawable {
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
    private readonly CANVAS_WIDTH: number,
    private readonly CANVAS_HEIGHT: number,
    private readonly HERO: Hero,
    private readonly GENERATION_INTERVAL = CycleObstacles.INITIAL_GENERATION_INTERVAL
  ) {}

  update() {
    this.frameNo += 1;

    this.platforms = this.platforms.filter((platform) => {
      return platform.bottom > 0;
    });

    if (this.isGenerationTime) {
      const obstacle = new Obstacle(
        this.CANVAS_WIDTH,
        this.CANVAS_HEIGHT,
        this.HERO.width
      );
      this.platforms = this.platforms.concat([
        obstacle.LEFT_PLATFORM,
        obstacle.RIGHT_PLATFORM,
      ]);
    }

    this.platforms.forEach((platform) => platform.updateCoordinates());
  }

  draw(context: CanvasRenderingContext2D) {
    this.platforms.forEach((platform) => platform.draw(context));
  }

  collide() {
    this.HERO.isGrounded = false;

    this.platforms.forEach((platform) => {
      const collisionDirection = platform.repel(this.HERO);
      if (!collisionDirection) {
        return;
      }

      this.HERO.collide(collisionDirection);
    });
  }
}
