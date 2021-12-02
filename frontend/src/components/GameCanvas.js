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
    redo,
    undo,
    saveCanvasState,
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

    const handleUndo = () => {
      undo(false);
    };

    const handleRedo = () => {
      console.log('redo');
      redo(false);
    };

    if (socket) {
      socket.on('drawingEvent', onDrawingEvent);
      socket.on('clearCanvas', onClearCanvas);
      socket.on('undo', handleUndo);
      socket.on('redo', handleRedo);
      socket.on('saveCanvasState', saveCanvasState);
    }
    
    return () => {
      if (socket) {
        socket.off('drawingEvent', onDrawingEvent);
        socket.off('clearCanvas', onClearCanvas);
        socket.off('undo', handleUndo);
        socket.off('redo', handleRedo);
        socket.off('saveCanvasState', saveCanvasState);
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