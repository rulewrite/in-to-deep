import Gravity from '@classes/Gravity';
import Hero from '@classes/Hero';
import CycleObstacles from '@classes/CycleObstacles';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';
import Environment from './Environment';
import Controller from './Controller';
import OverflowGuide from './OverflowGuide';
import Drawable from './Drawable';

export default class Game implements Drawable {
  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly AREA;
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly CYCLE_OBSTACLES;
  private readonly CONTROLLER = new Controller(this.HERO);
  private readonly OVERFLOW_GUIDE = new OverflowGuide(this.HERO);
  private readonly DEBUGGER;

  constructor(width: number, height: number) {
    this.AREA = new Area(width, height, this.HERO);
    this.CYCLE_OBSTACLES = new CycleObstacles(width, height, this.HERO.width);

    this.DEBUGGER = new Debugger(this.CYCLE_OBSTACLES, this.AREA, this.HERO);
  }

  isOver() {
    if (Environment.IS_DEVELOPMENT) {
      return false;
    }

    return this.AREA.isCollideBottom();
  }

  private update() {
    // update object
    this.CYCLE_OBSTACLES.update();

    // update hero
    this.GRAVITY.realize();
    this.CONTROLLER.interact();
    this.HERO.update();
    this.AREA.block();
    this.CYCLE_OBSTACLES.collide(this.HERO);
  }

  draw(context: CanvasRenderingContext2D) {
    this.update();

    this.HERO.draw(context);
    this.CYCLE_OBSTACLES.draw(context);
    this.OVERFLOW_GUIDE.draw(context);

    // debug
    if (Environment.IS_DEVELOPMENT) {
      this.DEBUGGER.draw(context);
    }
  }
}
