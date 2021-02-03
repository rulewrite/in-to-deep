import React, { Component } from 'react';
import './App.css';
import Canvas from '@components/Canvas';
import Mover from '@classes/Mover';
import Gravity from '@classes/Gravity';
import Floor from '@classes/Floor';
import Keyboard from '@classes/Keyboard';

class App extends Component {
  private static readonly KEYBOARD = new Keyboard();

  private readonly MOVER = new Mover(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity();

  constructor(props: any) {
    super(props);

    this.GRAVITY.registerMover(this.MOVER);

    this.draw = this.draw.bind(this);
  }

  private moving() {
    const { isPressedRight, isPressedLeft, isPressedMovingKey } = App.KEYBOARD;

    if (!isPressedMovingKey || (isPressedRight && isPressedLeft)) {
      this.MOVER.moveSide();
      return;
    }

    if (isPressedRight && !isPressedLeft) {
      this.MOVER.moveSide('RIGHT');
    }

    if (isPressedLeft && !isPressedRight) {
      this.MOVER.moveSide('LEFT');
    }
  }

  private draw(context: CanvasRenderingContext2D) {
    const floors = [
      new Floor(120, 60, 300, 'red'),
      new Floor(0, 100, 300, 'blue'),
      new Floor(350, 100, 300, 'yellow'),
      new Floor(120, 360, 8000, 'green'),
    ];

    this.moving();
    this.GRAVITY.operate(floors);

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
