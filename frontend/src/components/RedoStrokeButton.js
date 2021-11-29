import React from 'react';
import { useCanvas } from './CanvasContext';

export const RedoStrokeButton = () => {
  const { redoStroke} = useCanvas();

  return <button className='btn2' onClick={redoStroke}>Redo</button>;
};