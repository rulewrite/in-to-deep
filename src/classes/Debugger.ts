import CanvasComponent from './CanvasComponent';

export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }
  static renderPosition(
    canvasComponents: CanvasComponent[],
    context: CanvasRenderingContext2D
  ) {
    canvasComponents.forEach((canvasComponent) => {
      const { x, y } = canvasComponent;
      context.font = '20px san-serif';
      context.fillStyle = 'red';

      const cleanX = this.cleaning(x);
      const cleanY = this.cleaning(y);

      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
