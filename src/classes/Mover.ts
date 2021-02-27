import Shape from './Shape';

export default class Mover extends Shape {
  xVelocity = 0;
  yVelocity = 0;

  updateCoordinates() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}
