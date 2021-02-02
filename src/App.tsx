import React, { Component } from 'react';
import './App.css';
import Canvas from '@components/Canvas';
import Mover from '@classes/Mover';
import Gravity from '@classes/Gravity';
import Floor from '@classes/Floor';

class App extends Component {
  private readonly MOVER = new Mover(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity();

  constructor(props: any) {
    super(props);

    this.GRAVITY.registerMover(this.MOVER);

    this.draw = this.draw.bind(this);
  }

  private draw(context: CanvasRenderingContext2D) {
    const floors = [new Floor(0, 300, 40), new Floor(40, 460, 8000)];
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
