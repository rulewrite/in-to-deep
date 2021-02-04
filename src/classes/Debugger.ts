import { GameProps } from '@components/Game';
import CanvasComponent from './CanvasComponent';

export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }
  static renderPosition(
    context: CanvasRenderingContext2D,
    canvasComponents: CanvasComponent[] = [],
    game: GameProps
  ) {
    context.fillStyle = 'red';

    context.fillRect(game.width, 0, 1, game.height);

    canvasComponents.forEach((canvasComponent) => {
      const { x, y } = canvasComponent;
      context.font = '20px san-serif';

      const cleanX = this.cleaning(x);
      const cleanY = this.cleaning(y);

      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
