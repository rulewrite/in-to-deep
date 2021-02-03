import React, { Component } from 'react';
import './App.css';
import Canvas from '@components/Canvas';
import Mover from '@classes/Mover';
import Gravity from '@classes/Gravity';
import Floor from '@classes/Floor';
import Keyboard from '@classes/Keyboard';

export type Directions = 'LEFT' | 'RIGHT';

class App extends Component {
  private static readonly KEYBOARD = new Keyboard();

  private readonly MOVER = new Mover(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity(this.MOVER);

  constructor(props: any) {
    super(props);

    this.draw = this.draw.bind(this);
  }

  private getPressedDirections(): Directions | undefined {
    const { isPressedRight, isPressedLeft, isPressedMovingKey } = App.KEYBOARD;

    if (!isPressedMovingKey || (isPressedRight && isPressedLeft)) {
      return;
    }

    if (isPressedRight && !isPressedLeft) {
      return 'RIGHT';
    }

    if (isPressedLeft && !isPressedRight) {
      return 'LEFT';
    }
  }

  private draw(context: CanvasRenderingContext2D) {
    const pressedDirections = this.getPressedDirections();
    const floors = [
      new Floor(120, 150, 300, 'red'),
      new Floor(0, 500, 300, 'blue'),
      new Floor(380, 101, 300, 'purple'),
      new Floor(120, 360, 8000, 'green'),
    ];

    this.GRAVITY.realize(floors);
    this.MOVER.moveSide(floors, pressedDirections);

    this.MOVER.renderCanvas(context);
    floors.forEach((floor) => floor.renderCanvas(context));
  }

  render() {
    const { draw } = this;

    return (
      <div className="App">
        <Canvas draw={draw} width={800} height={600} isClearEachFrame={true} />
      </div>
    );
  }
}

export default App;
