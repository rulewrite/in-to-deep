import Area from './Area';
import CanvasComponent from './CanvasComponent';
import Hero from './Hero';

export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }
  static renderPosition(
    context: CanvasRenderingContext2D,
    canvasComponents: CanvasComponent[] = [],
    area: Area,
    hero: Hero
  ) {
    context.fillStyle = 'red';

    context.fillRect(area.width, 0, 1, area.height);

    context.fillText(
      `isOnFloor: ${hero.isOnFloor}, isJumping: ${hero.isJumping}`,
      10,
      20
    );
    context.fillText(`xVelocity: ${hero.xVelocity}`, 10, 40);

    canvasComponents.forEach((canvasComponent) => {
      const { x, y } = canvasComponent;
      context.font = '20px san-serif';

      const cleanX = this.cleaning(x);
      const cleanY = this.cleaning(y);

      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
