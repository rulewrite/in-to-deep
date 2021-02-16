export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }
  static draw(
    context: CanvasRenderingContext2D,
    { cycleObstacles, area, hero }: any
  ) {
    // base
    context.fillStyle = 'red';
    context.font = '20px san-serif';

    // outline
    context.fillRect(area.WIDTH, 0, 1, area.HEIGHT);

    // hero
    context.fillText(
      `isGrounded: ${hero.isGrounded}, isJumping: ${hero.isJumping}`,
      10,
      20
    );
    context.fillText(`xVelocity: ${hero.xVelocity}`, 10, 40);
    context.fillText(`yVelocity: ${hero.yVelocity}`, 10, 60);

    // platform
    cycleObstacles.platforms.forEach((platform: any) => {
      const { x, y } = platform;

      const cleanX = this.cleaning(x);
      const cleanY = this.cleaning(y);
      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
