abstract class CanvasComponent {
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string
  ) {}

  renderCanvas(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default CanvasComponent;
