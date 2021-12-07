import React from 'react';
import { useCanvas } from './CanvasContext';

export const StrokeThickness = () => {
  const { changeLineWidth } = useCanvas();

  return (
    <div>
      <input className="slider" id="typeinp"
        type="range"
        min="1"
        max="30"
        defaultValue="15"
        step="1"
        onChange={(event) => {
          let slider = (parseInt(event.target.value));
          changeLineWidth(slider);
        }}
      />
    </div>
  );
};
