import React, { Component } from 'react';
import Canvas from '@components/Canvas';
import Gravity from '@classes/Gravity';
import Keyboard from '@classes/Keyboard';
import Hero from '@classes/Hero';
import Scroll from '@classes/Scroll';
import Obstacles from '@classes/Obstacles';
import ObstacleFactory from '@classes/ObstacleFactory';
import Debugger from '@classes/Debugger';

export type Directions = 'LEFT' | 'RIGHT';

class Game extends Component {
  private static readonly KEYBOARD = new Keyboard();

  private readonly CANVAS = {
    width: 800,
    height: 600,
  };
  private readonly HERO = new Hero(60, 30, 30, 30);
  private readonly GRAVITY = new Gravity(this.HERO);
  private readonly SCROLL = new Scroll();
  private readonly OBSTACLES = new Obstacles(
    new ObstacleFactory(this.CANVAS.width, this.CANVAS.height, this.HERO)
  );

  constructor(props: any) {
    super(props);

    this.draw = this.draw.bind(this);
  }

  private getPressedDirections(): Directions | undefined {
    const { isPressedRight, isPressedLeft, isPressedMovingKey } = Game.KEYBOARD;

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
    const { floors } = this.OBSTACLES;

    this.OBSTACLES.update();
    this.SCROLL.wind(floors);
    this.GRAVITY.realize(floors);
    this.HERO.moveSide(floors, pressedDirections);

    this.HERO.renderCanvas(context);
    floors.forEach((floor) => floor.renderCanvas(context));

    Debugger.renderPosition(context, [this.HERO, ...floors], this.CANVAS);
  }

  render() {
    const { draw } = this;

    return (
      <Canvas
        draw={draw}
        width={this.CANVAS.width + 100}
        height={this.CANVAS.height}
        isClearEachFrame={true}
      />
    );
  }
}

export default Game;
