import React from 'react';
import Canvas from '@components/Canvas';
import Game from '@classes/Game';
import ScoreBoard from './ScoreBoard';

const GameBoard = ({ width, height }: { width: number; height: number }) => {
  const [isRunning, setIsRunning] = React.useState(true);

  const GAME = new Game(width, height);
  const draw = (context: CanvasRenderingContext2D) => {
    GAME.run(context);
    if (GAME.isOver()) {
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
