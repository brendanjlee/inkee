import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';

export function GameCanvas({socket = null}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    inDrawing,
    draw,
    clearCanvasSocket,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  // Socket game handlers.
  useEffect(() => {
    if (socket) {
      socket.on('clearCanvas', clearCanvasSocket);
    }
    
    return () => {
      if (socket) {
        socket.off('clearCanvas', clearCanvasSocket);
      }
    };
  }, [socket]);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={inDrawing}
      ref={canvasRef}
    />
  );
}

export default GameCanvas;