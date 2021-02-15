import Mover from './Mover';

export default class OverflowGuide {
  private static readonly HEIGHT = 10;
  constructor(private readonly MOVER: Mover) {}

  draw(context: CanvasRenderingContext2D) {
    if (this.MOVER.bottom >= 0) {
      return;
    }

    const { color, center, left, right } = this.MOVER;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(center, 0);
    context.lineTo(left, OverflowGuide.HEIGHT);
    context.lineTo(right, OverflowGuide.HEIGHT);
    context.fill();
  }
}
