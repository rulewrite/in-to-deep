import Shape from './Shape';

export default class Rectangle extends Shape {
  isWithin(wrappedRectangle: Rectangle) {
    const { left, right, top, bottom } = this;
    const {
      left: wrappedLeft,
      right: wrappedRight,
      top: wrappedTop,
      bottom: wrappedBottom,
    } = wrappedRectangle;

    return (
      wrappedLeft <= left &&
      wrappedRight >= right &&
      wrappedTop <= top &&
      wrappedBottom >= bottom
    );
  }
}
