import Gravity from '@classes/Gravity';
import Hero from '@classes/Hero';
import Scroll from '@classes/Scroll';
import CyclePlatforms from '@classes/CyclePlatforms';
import PlatformFactory from '@classes/PlatformFactory';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';
import Environment from './Environment';
import Controller from './Controller';

export default class Game {
  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly AREA;
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly CYCLE_PLATFORMS;
  private readonly CONTROLLER = new Controller(this.HERO);

  constructor(width: number, height: number) {
    this.AREA = new Area(width, height, this.HERO);
    this.CYCLE_PLATFORMS = new CyclePlatforms(
      new PlatformFactory(width, height, this.HERO),
      new Scroll()
    );
  }

  isOver(): boolean {
    return this.AREA.isHitDeadlineBy();
  }

  update(context: CanvasRenderingContext2D) {
    // update object
    this.CYCLE_PLATFORMS.update();

    // update hero
    this.GRAVITY.realize();
    this.CYCLE_PLATFORMS.collision(this.HERO);
    this.CONTROLLER.interact();
    this.AREA.block();
    this.HERO.update();

    // draw
    this.HERO.draw(context);
    this.CYCLE_PLATFORMS.draw(context);
    this.AREA.drawOverflowGuide(context);

    // debug
    if (Environment.IS_DEVELOPMENT) {
      Debugger.draw(context, {
        hero: this.HERO,
        cyclePlatforms: this.CYCLE_PLATFORMS,
        area: this.AREA,
      });
    }
  }
}
