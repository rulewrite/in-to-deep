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

  get center() {
    return this.x + this.halfWidth;
  }
  get middle() {
    return this.y + this.halfHeight;
  }

  private _width = 0;
  halfWidth = 0;
  set width(_width: number) {
    this._width = _width;
    this.halfWidth = _width / 2;
  }
  get width() {
    return this._width;
  }

  private _height = 0;
  halfHeight = 0;
  set height(_height: number) {
    this._height = _height;
    this.halfHeight = _height / 2;
  }
  get height() {
    return this._height;
  }

  constructor(
    public x: number,
    public y: number,
    width: number,
    height: number,
    public color: string
  ) {
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default CanvasComponent;
