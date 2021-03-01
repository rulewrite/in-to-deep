import Shape from './Shape';

export default class Area extends Shape {
  block(target: Shape) {
    const { left, right, top, bottom } = this;
    const {
      left: targetLeft,
      right: targetRight,
      top: targetTop,
      bottom: targetBottom,
    } = target;

    if (targetLeft < left) {
      target.x = left;
    }
    if (targetTop < top) {
      target.y = top;
    }
    if (targetRight > right) {
      target.x = right - target.width;
    }
    if (targetBottom > bottom) {
      target.y = bottom - target.height;
    }
  }
}
