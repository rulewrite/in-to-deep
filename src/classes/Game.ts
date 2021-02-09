import Gravity from '@classes/Gravity';
import Hero from '@classes/Hero';
import Scroll from '@classes/Scroll';
import Obstacles from '@classes/Obstacles';
import ObstacleFactory from '@classes/ObstacleFactory';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';
import Environment from './Environment';
import Controller from './Controller';

export default class Game {
  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly AREA;
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly OBSTACLES;
  private readonly CONTROLLER = new Controller(this.HERO);

  constructor(width: number, height: number) {
    this.AREA = new Area(width, height, this.HERO);
    this.OBSTACLES = new Obstacles(
      new ObstacleFactory(width, height, this.HERO),
      new Scroll()
    );
  }

  isOver(): boolean {
    return this.AREA.isHitDeadlineBy();
  }

  update(context: CanvasRenderingContext2D) {
    // update object
    this.OBSTACLES.update();

    // update hero
    this.GRAVITY.realize();
    this.OBSTACLES.collision(this.HERO);
    this.CONTROLLER.interact();
    this.HERO.isGrounded = false;
    this.HERO.move();
    this.AREA.block();

    // draw
    this.HERO.draw(context);
    this.OBSTACLES.draw(context);
    this.AREA.drawOverflowGuide(context);

    // debug
    if (Environment.IS_DEVELOPMENT) {
      Debugger.draw(context, {
        hero: this.HERO,
        obstacles: this.OBSTACLES,
        area: this.AREA,
      });
    }
  }
}
