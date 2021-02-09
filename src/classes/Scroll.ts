import Platform from './Platform';

class Scroll {
  private static readonly INITIAL_SPEED = 1;

  constructor(private speed: number = Scroll.INITIAL_SPEED) {}

  wind(platforms: Platform[]) {
    platforms.forEach((platform) => {
      platform.y = platform.y - this.speed;
    });
  }
}

export default Scroll;
