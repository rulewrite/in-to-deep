import Mover, { SideDirections } from './Mover';

class Hero extends Mover {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly HEAD_WIDTH = 10;

  private readonly MIDDLE: number;
  private get headToX() {
    return this.sideDirection === SideDirections.LEFT ? this.x : this.right;
  }
  private get headToY() {
    return this.y + this.MIDDLE;
  }
  private get bodyX() {
    return this.sideDirection === SideDirections.LEFT
      ? this.x + Hero.HEAD_WIDTH
      : this.right - Hero.HEAD_WIDTH;
  }
  private get tailX() {
    return this.sideDirection === SideDirections.LEFT ? this.right : this.x;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Hero.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);

    this.MIDDLE = this.height / 2;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.headToX, this.headToY);
    context.lineTo(this.bodyX, this.top);
    context.lineTo(this.tailX, this.top);
    context.lineTo(this.tailX, this.bottom);
    context.lineTo(this.bodyX, this.bottom);
    context.fill();
  }
}

export default Hero;
