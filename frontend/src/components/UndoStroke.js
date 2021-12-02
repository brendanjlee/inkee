import React from 'react';
import { useCanvas } from './CanvasContext';

export const UndoStrokeButton = () => {
  const { undo } = useCanvas();

  return <button className='btn2' onClick={undo}>undo</button>;
};