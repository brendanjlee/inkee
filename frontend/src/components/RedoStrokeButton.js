import React from 'react';
import { useCanvas } from './CanvasContext';

export const RedoStrokeButton = () => {
  const { redo } = useCanvas();

  return <button className='btn2' onClick={() => {
    redo(true);
  }}>redo</button>;
};