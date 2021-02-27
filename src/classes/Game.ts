import Gravity from '@classes/Gravity';
import Hero from '@classes/Hero';
import CycleObstacles from '@classes/CycleObstacles';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';
import Environment from './Environment';
import Controller from './Controller';
import OverflowGuide from './OverflowGuide';
import Drawable from '@interfaces/Drawable';
import Camera from './Camera';
import Platforms from './Platforms';

export default class Game implements Drawable {
  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly CONTROLLER = new Controller(this.HERO);
  private readonly PLATFORMS: Platforms = new Platforms(this.HERO);
  private readonly DRAWABLES: Drawable[] = [
    this.HERO,
    this.PLATFORMS,
    new OverflowGuide(this.HERO),
  ];
  private readonly CAMERA;
  private readonly AREA;
  private readonly CYCLE_OBSTACLES;

  constructor(width: number, height: number) {
    this.CAMERA = new Camera(
      width - 100,
      height - 100,
      width - 50,
      height - 50,
      this.HERO
    );
    this.AREA = new Area(width, height, this.HERO);
    this.CYCLE_OBSTACLES = new CycleObstacles(
      width,
      height,
      this.HERO.width,
      this.PLATFORMS
    );

    if (Environment.IS_DEVELOPMENT) {
      this.DRAWABLES.push(
        new Debugger({
          PLATFORMS: this.PLATFORMS,
          AREA: this.AREA,
          HERO: this.HERO,
          CAMERA: this.CAMERA,
        })
      );
    }
  }

  isOver() {
    if (Environment.IS_DEVELOPMENT) {
      return false;
    }

    return this.AREA.isCollideBottom();
  }

  private update() {
    // update object
    this.PLATFORMS.update();
    this.CYCLE_OBSTACLES.generate();

    // update hero
    this.CONTROLLER.interact();
    this.HERO.update();

    // collision
    this.GRAVITY.realize();
    this.AREA.block();
    this.PLATFORMS.collide();

    this.CAMERA.follow();
  }

  draw(context: CanvasRenderingContext2D) {
    this.update();

    this.DRAWABLES.forEach((drawable) => drawable.draw(context));
  }
}
