import Drawable from '@interfaces/Drawable';

export default class Debugger implements Drawable {
  private static cleaning(number: number) {
    return Math.floor(number);
  }

  constructor(private readonly TARGET: any) {}

  draw(context: CanvasRenderingContext2D) {
    // base
    context.fillStyle = 'red';
    context.font = '20px san-serif';

    // hero
    context.fillText(
      `isGrounded: ${this.TARGET.HERO.isGrounded}, isJumping: ${this.TARGET.HERO.isJumping}`,
      10,
      20
    );
    context.fillText(`xVelocity: ${this.TARGET.HERO.xVelocity}`, 10, 40);
    context.fillText(`yVelocity: ${this.TARGET.HERO.yVelocity}`, 10, 60);

    // platform
    this.TARGET.PLATFORMS.forEach((platform: any) => {
      const { x, y } = platform;

      const cleanX = Debugger.cleaning(x);
      const cleanY = Debugger.cleaning(y);
      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });

    // camera
    context.fillText(
      'camera',
      this.TARGET.CAMERA.right,
      this.TARGET.CAMERA.y + 20
    );
    context.strokeRect(
      this.TARGET.CAMERA.x,
      this.TARGET.CAMERA.y,
      this.TARGET.CAMERA.width,
      this.TARGET.CAMERA.height
    );

    // world
    context.fillText(
      'world',
      this.TARGET.WORLD.right,
      this.TARGET.WORLD.y + 20
    );
    context.strokeRect(
      this.TARGET.WORLD.x,
      this.TARGET.WORLD.y,
      this.TARGET.WORLD.width,
      this.TARGET.WORLD.height
    );
  }
}
