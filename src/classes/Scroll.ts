import Shape from './Shape';

export default class Scroll {
  private static readonly INITIAL_SPEED = 1;

  constructor(private speed: number = Scroll.INITIAL_SPEED) {}

  wind(shapes: Shape[]) {
    shapes.forEach((shape) => {
      shape.y -= this.speed;
    });
  }
}
