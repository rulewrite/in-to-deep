import React from 'react';
import './App.css';
import Canvas, { CanvasProps } from '@components/Canvas';
import Mover from '@classes/Mover';
import Gravity from '@classes/Gravity';

const App = () => {
  const mover = new Mover(30, 30, 30, 100);

  const gravity = new Gravity();
  gravity.registerMover(mover);

  const draw: CanvasProps['draw'] = (context) => {
    gravity.operate();
    mover.update(context);
  };

  return (
    <div className="App">
      <Canvas draw={draw} width={800} height={600} isClearEachFrame={true} />
    </div>
  );
};

export default App;
