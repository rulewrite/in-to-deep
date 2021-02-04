import React, { Component } from 'react';
import './App.css';
import Canvas from '@components/Canvas';
import Gravity from '@classes/Gravity';
import Floor from '@classes/Floor';
import Keyboard from '@classes/Keyboard';
import Hero from '@classes/Hero';

export type Directions = 'LEFT' | 'RIGHT';

class App extends Component {
  private static readonly KEYBOARD = new Keyboard();

  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity(this.HERO);

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
      // new Floor(0, 100, 100, 'red'),
      // new Floor(0, 200, 300, 'purple'),
      new Floor(0, 300, 400, 'green'),
      new Floor(0, 500, 600, 'blue'),
    ];

    this.GRAVITY.realize(floors);
    this.HERO.moveSide(floors, pressedDirections);

    this.HERO.renderCanvas(context);
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
