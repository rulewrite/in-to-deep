import Floor from './Floor';

class Scroll {
  wind(floors: Floor[]) {
    floors.forEach((floor) => {
      floor.y = floor.y - 1;
    });
  }
}

export default Scroll;
