import CanvasComponent from './CanvasComponent';

class Mover extends CanvasComponent {
  private static readonly INITIAL_COLOR = '#d40000';

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color = Mover.INITIAL_COLOR
  ) {
    super(x, y, width, height, color);
  }
}

export default Mover;
