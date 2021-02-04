import Area from './Area';
import CanvasComponent from './CanvasComponent';

export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }
  static renderPosition(
    context: CanvasRenderingContext2D,
    canvasComponents: CanvasComponent[] = [],
    area: Area
  ) {
    context.fillStyle = 'red';

    context.fillRect(area.width, 0, 1, area.height);

    canvasComponents.forEach((canvasComponent) => {
      const { x, y } = canvasComponent;
      context.font = '20px san-serif';

      const cleanX = this.cleaning(x);
      const cleanY = this.cleaning(y);

      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
