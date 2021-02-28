import Drawable from 'interfaces/Drawable';
import Hero from './Hero';
import Platform from './Platform';

export default class Platforms extends Array<Platform> implements Drawable {
  constructor(private HERO: Hero, ...platforms: Platform[]) {
    super(...platforms);
  }

  draw(context: CanvasRenderingContext2D) {
    this.forEach((platform) => platform.draw(context));
  }

  collide() {
    this.HERO.isGrounded = false;

    this.forEach((platform) => platform.repel(this.HERO));
  }

  private destory() {
    const destroyedIndexes: number[] = [];

    this.forEach((platform, index) => {
      if (!platform.isDestory) {
        return;
      }

      destroyedIndexes.push(index);
    });

    for (let i = destroyedIndexes.length - 1; i >= 0; i--) {
      this.splice(destroyedIndexes[i], 1);
    }
  }

  update() {
    this.destory();
    this.forEach((platform) => platform.updateCoordinates());
  }
}
