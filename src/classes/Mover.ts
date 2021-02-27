import Shape from './Shape';

export default class Mover extends Shape {
  constructor(
    x: number,
    y: number,
    width: number,
    heigth: number,
    public xVelocity = 0,
    public yVelocity = 0
  ) {
    super(x, y, width, heigth);
  }

  updateCoordinates() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}
