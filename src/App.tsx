import React from 'react';
import './App.css';
import Canvas, { CanvasProps } from '@components/Canvas';

const App = () => {
  let y = 30;
  const draw: CanvasProps['draw'] = (context) => {
    y++;
    context.fillStyle = 'blue';
    context.fillRect(30, y, 40, 40);
  };

  return (
    <div className="App">
      <Canvas draw={draw} width={800} height={600} isClearEachFrame={true} />
    </div>
  );
};

export default App;
