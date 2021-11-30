import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';

export function GameCanvas({socket = null, isDrawer = true}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    inDrawing,
    draw,
    clearCanvas,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  // Socket game handlers.
  useEffect(() => {
    const onDrawingEvent = (drawingData) => {
      draw(drawingData.x0, drawingData.y0, drawingData.x1, drawingData.y1,
        drawingData.lineThickness, drawingData.color, false);
    };

    const onClearCanvas = () => {
      clearCanvas(false);
    };

    if (socket) {
      socket.on('drawingEvent', onDrawingEvent);
      socket.on('clearCanvas', onClearCanvas);
    }
    
    return () => {
      if (socket) {
        socket.off('drawingEvent', onDrawingEvent);
        socket.off('clearCanvas', onClearCanvas);
      }
    };
  }, [socket]);

  return (
    <canvas
      id='canvas'
      onMouseDown={isDrawer ? startDrawing : undefined}
      onMouseUp={isDrawer ? finishDrawing : undefined}
      onMouseMove={isDrawer ? inDrawing : undefined}
      ref={canvasRef}
    />
  );
}

export default GameCanvas;