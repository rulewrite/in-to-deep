import React, { useEffect, useRef } from 'react';

export type CanvasProps = JSX.IntrinsicElements['canvas'] & {
  draw: (context: CanvasRenderingContext2D) => void;
  isClearEachFrame?: boolean;
};

const Canvas = ({ draw, isClearEachFrame = false, ...props }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      let animationFrameId: number;

      const render = () => {
        if (isClearEachFrame) {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }

        draw(context);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw, isClearEachFrame]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
