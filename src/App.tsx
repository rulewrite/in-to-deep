import React from 'react';
import './App.css';
import Canvas, { CanvasProps } from '@components/Canvas';
import Mover from '@classes/Mover';
import Gravity from '@classes/Gravity';
import Floor from '@classes/Floor';

const App = () => {
  const mover = new Mover(60, 30, 30, 30);

  const gravity = new Gravity();
  gravity.registerMover(mover);

  const draw: CanvasProps['draw'] = (context) => {
    const floors = [new Floor(0, 300, 40), new Floor(40, 460, 8000)];
    mover.update(context);
    floors.forEach((floor) => floor.update(context));

    gravity.operate(floors);
  };

  return (
    <div className="App">
      <Canvas draw={draw} width={800} height={600} isClearEachFrame={true} />
    </div>
  );
};

export default App;
