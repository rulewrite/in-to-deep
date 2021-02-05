import Gravity from '@classes/Gravity';
import Keyboard from '@classes/Keyboard';
import Hero from '@classes/Hero';
import Scroll from '@classes/Scroll';
import Obstacles from '@classes/Obstacles';
import ObstacleFactory from '@classes/ObstacleFactory';
import Debugger from '@classes/Debugger';
import Area from '@classes/Area';

export type Directions = 'LEFT' | 'RIGHT';

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

  private getPressedDirections(): Directions | undefined {
    const { isPressedRight, isPressedLeft, isPressedMovingKey } = Game.KEYBOARD;

    if (!isPressedMovingKey || (isPressedRight && isPressedLeft)) {
      return;
    }

    if (isPressedRight && !isPressedLeft) {
      return 'RIGHT';
    }

    if (isPressedLeft && !isPressedRight) {
      return 'LEFT';
    }
  }

  isOver(): boolean {
    return this.AREA.isHitDeadlineBy(this.HERO);
  }

  run(context: CanvasRenderingContext2D) {
    const pressedDirections = this.getPressedDirections();
    const { floors } = this.OBSTACLES;
    const { isPressedUp } = Game.KEYBOARD;

    this.OBSTACLES.update();
    this.SCROLL.wind(floors);
    this.GRAVITY.realize(floors);
    this.HERO.moveSide(floors, pressedDirections);
    this.HERO.moveUp(isPressedUp);
    this.AREA.blockSide(this.HERO);

    this.HERO.renderCanvas(context);
    floors.forEach((floor) => floor.renderCanvas(context));

    Debugger.renderPosition(
      context,
      [this.HERO, ...floors],
      this.AREA,
      this.HERO
    );
  }
}
