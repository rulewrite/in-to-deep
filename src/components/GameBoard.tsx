import React from 'react';
import Canvas from '@components/Canvas';
import Game from '@classes/Game';
import ScoreBoard from './ScoreBoard';
import Environment from '@classes/Environment';

const GameBoard = ({ width, height }: { width: number; height: number }) => {
  const [isRunning, setIsRunning] = React.useState(true);

  const GAME = new Game(width, height);
  const draw = (context: CanvasRenderingContext2D) => {
    GAME.update(context);

    if (GAME.isOver() && !Environment.IS_DEVELOPMENT) {
      setIsRunning(false);
    }
  };

  return (
    <>
      <ScoreBoard isBreak={!isRunning} />
      <Canvas
        draw={draw}
        isBreak={!isRunning}
        width={width + 100}
        height={height}
      />
    </>
  );
};

export default GameBoard;
