import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function GameCanvas({socket}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    clearCanvas,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  // Socket game handlers.
  useEffect(() => {
    const startDrawingHandler = (startDrawingData) => {
      startDrawing({nativeEvent: startDrawingData});
    };

    socket.on('startDrawing', startDrawingHandler);
    socket.on('finishDrawing', finishDrawing);

    const drawingHandler = (drawingData) => {
      draw({nativeEvent: drawingData});
    };

    socket.on('drawingEvent', drawingHandler);
    socket.on('clearCanvas', clearCanvas);

    return () => {
      socket.off('drawingEvent', drawingHandler);
      socket.off('clearCanvas', clearCanvas);
      socket.off('startDrawing', startDrawingHandler);
      socket.off('finishDrawing', finishDrawing);
    }
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