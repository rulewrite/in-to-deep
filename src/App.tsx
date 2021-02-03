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

    if (!isPressedMovingKey) {
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
    const floors = [new Floor(0, 300, 40), new Floor(40, 460, 8000)];

    this.moving();

    this.MOVER.renderCanvas(context);
    floors.forEach((floor) => floor.renderCanvas(context));

    this.GRAVITY.operate(floors);
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
