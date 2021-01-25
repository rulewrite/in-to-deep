class Mover {
  private static readonly INITIAL_COLOR = '#d40000';

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    private color = Mover.INITIAL_COLOR
  ) {}

  update(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Mover;
