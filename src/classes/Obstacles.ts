import CanvasComponent from './CanvasComponent';
import Floor from './Floor';

class Obstacles {
  private static readonly INITIAL_GENERATION_INTERVAL = 150;
  private static readonly GAP_MARGIN = 30;
  private static getRandomRangeValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private frameNo = 0;
  private get isGenerationTime() {
    if (this.frameNo === 1) {
      return true;
    }
    return !((this.frameNo / this.generationInterval) % 1);
  }
  private readonly minimumWidth: number;
  private readonly maximumWidth: number;
  private get width() {
    return Obstacles.getRandomRangeValue(this.minimumWidth, this.maximumWidth);
  }
  private readonly minimumGap: number;

  floors: Floor[] = [];

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    passer: CanvasComponent,
    private generationInterval = Obstacles.INITIAL_GENERATION_INTERVAL
  ) {
    const widthWithMargin = Obstacles.GAP_MARGIN + passer.width;
    this.minimumWidth = this.minimumGap = widthWithMargin;
    this.maximumWidth = canvasWidth - widthWithMargin;
  }

  private generation() {
    if (!this.isGenerationTime) {
      return;
    }

    const { width } = this;
    this.floors.push(new Floor(0, this.canvasHeight, width));

    const maximumGap = this.canvasWidth - width - this.minimumWidth;
    const gap = Obstacles.getRandomRangeValue(this.minimumGap, maximumGap);

    const rightFloorX = width + gap;
    const rightFloorWidth = this.canvasWidth - rightFloorX;
    this.floors.push(
      new Floor(rightFloorX, this.canvasHeight, rightFloorWidth)
    );
  }

  update() {
    this.frameNo += 1;

    this.floors = this.floors.filter((floor) => {
      return floor.bottom > 0;
    });

    this.generation();
  }
}

export default Obstacles;
