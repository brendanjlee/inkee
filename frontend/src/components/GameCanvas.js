import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function GameCanvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div className="drawArea">
        <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        />
    </div>
  );
}

export default GameCanvas;