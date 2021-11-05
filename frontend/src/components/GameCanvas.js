import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';

export function GameCanvas({socket = null}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    startDrawingSocket,
    finishDrawingSocket,
    drawSocket,
    clearCanvasSocket,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  // Socket game handlers.
  useEffect(() => {
    if (socket) {
      socket.on('drawingEvent', drawSocket);
      socket.on('clearCanvas', clearCanvasSocket);
      socket.on('startDrawing', startDrawingSocket);
      socket.on('finishDrawing', finishDrawingSocket);
    }
    
    return () => {
      if (socket) {
        socket.off('drawingEvent', drawSocket);
        socket.off('clearCanvas', clearCanvasSocket);
        socket.off('startDrawing', startDrawingSocket);
        socket.off('finishDrawing', finishDrawingSocket);
      }
    };
  }, [socket]);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default GameCanvas;