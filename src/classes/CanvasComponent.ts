abstract class CanvasComponent {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string
  ) {}

  update(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default CanvasComponent;
