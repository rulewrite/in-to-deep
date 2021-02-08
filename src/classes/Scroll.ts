import Platform from './Platform';

class Scroll {
  wind(platforms: Platform[]) {
    platforms.forEach((platform) => {
      platform.y = platform.y - 1;
    });
  }
}

export default Scroll;
