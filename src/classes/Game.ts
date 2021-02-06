import Gravity from '@classes/Gravity';
import Keyboard from '@classes/Keyboard';
import Hero from '@classes/Hero';
import Scroll from '@classes/Scroll';
import Obstacles from '@classes/Obstacles';
import ObstacleFactory from '@classes/ObstacleFactory';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';
import Environment from './Environment';

export default class Game {
  private static readonly KEYBOARD = new Keyboard();

  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly AREA;
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly SCROLL = new Scroll();
  private readonly OBSTACLES;

  constructor(width: number, height: number) {
    this.AREA = new Area(width, height);
    this.OBSTACLES = new Obstacles(
      new ObstacleFactory(width, height, this.HERO)
    );
  }

  isOver(): boolean {
    return this.AREA.isHitDeadlineBy(this.HERO);
  }

  run(context: CanvasRenderingContext2D) {
    const { floors } = this.OBSTACLES;

    this.OBSTACLES.update();
    this.SCROLL.wind(floors);
    this.GRAVITY.realize();
    this.HERO.move(Game.KEYBOARD);
    floors.forEach((floors) => floors.repel(this.HERO));
    this.AREA.block(this.HERO);

    this.HERO.renderCanvas(context);
    floors.forEach((floor) => floor.renderCanvas(context));

    if (Environment.isDevelopment) {
      Debugger.renderPosition(
        context,
        [this.HERO, ...floors],
        this.AREA,
        this.HERO
      );
    }
  }
}
