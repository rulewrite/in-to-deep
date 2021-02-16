export default class Debugger {
  private static cleaning(number: number) {
    return Math.floor(number);
  }

  constructor(
    private readonly CYCLE_OBSTACLES: any,
    private readonly AREA: any,
    private readonly HERO: any
  ) {}

  draw(context: CanvasRenderingContext2D) {
    // base
    context.fillStyle = 'red';
    context.font = '20px san-serif';

    // outline
    context.fillRect(this.AREA.WIDTH, 0, 1, this.AREA.HEIGHT);

    // hero
    context.fillText(
      `isGrounded: ${this.HERO.isGrounded}, isJumping: ${this.HERO.isJumping}`,
      10,
      20
    );
    context.fillText(`xVelocity: ${this.HERO.xVelocity}`, 10, 40);
    context.fillText(`yVelocity: ${this.HERO.yVelocity}`, 10, 60);

    // platform
    this.CYCLE_OBSTACLES.platforms.forEach((platform: any) => {
      const { x, y } = platform;

      const cleanX = Debugger.cleaning(x);
      const cleanY = Debugger.cleaning(y);
      context.fillText(`${cleanX}, ${cleanY}`, cleanX, cleanY);
    });
  }
}
