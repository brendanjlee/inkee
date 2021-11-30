import React from "react";
import { useCanvas } from "./CanvasContext";

export const UndoStrokeButton = () => {
  const { undoStroke} = useCanvas();

  return <button className='btn2' onClick={undoStroke}>undo</button>;
};