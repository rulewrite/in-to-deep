import Mover from './Mover';

class Hero extends Mover {
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly HEAD_WIDTH = 10;

  private get headX() {
    return this.sideDirection === 'LEFT' ? this.x : this.right;
  }
  private get headY() {
    return this.y + this.halfHeight;
  }

  private get bodyX() {
    return this.sideDirection === 'LEFT'
      ? this.x + Hero.HEAD_WIDTH
      : this.right - Hero.HEAD_WIDTH;
  }

  private get tailX() {
    return this.sideDirection === 'LEFT' ? this.right : this.x;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Hero.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.headX, this.headY);
    context.lineTo(this.bodyX, this.top);
    context.lineTo(this.tailX, this.top);
    context.lineTo(this.tailX, this.bottom);
    context.lineTo(this.bodyX, this.bottom);
    context.fill();
  }
}

export default Hero;
