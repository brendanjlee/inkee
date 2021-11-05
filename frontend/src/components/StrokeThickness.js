import React from "react";
import { useState } from "react";
import { useCanvas } from "./CanvasContext";

export const StrokeThickness = () => {
  const { changeLineWidth } = useCanvas();

  return (
    <div>
      <input id="typeinp"
        type="range"
        min="1"
        max="15"
        defaultValue="5"
        step="1"
        onChange={(event) => {
          let slider = (parseInt(event.target.value));
          changeLineWidth(slider);
        }}
      />
    </div>
  )
}
