import Drawable from './Drawable';
import Hero from './Hero';

export default class OverflowGuide implements Drawable {
  private static readonly HEIGHT = 10;
  constructor(private readonly HERO: Hero) {}

  draw(context: CanvasRenderingContext2D) {
    if (this.HERO.bottom >= 0) {
      return;
    }

    const { color, center, left, right } = this.HERO;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(center, 0);
    context.lineTo(left, OverflowGuide.HEIGHT);
    context.lineTo(right, OverflowGuide.HEIGHT);
    context.fill();
  }
}
