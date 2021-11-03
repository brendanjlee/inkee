import React, { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function Canvas(props) {
  const [customStrokeWidth, setStrokeWidth] = useState(8);
  const [customStrokeColor, setStrokeColor] = useState('black');
  const canvas = props.canvas;

  return (
    <div>
      <ReactSketchCanvas 
        ref={canvas}
        width="24em"
        height="15rem"
        strokeWidth={customStrokeWidth}
        strokeColor={customStrokeColor}
        style={{
        border: ".5rem solid black",}} 
        onUpdate={(update) => {
          if (update.length !== 0) {
            props.setCanvasEmpty(false);
          }
        }}
      />
      <br/>
      <button
        className="btn2"
        onClick={() => {
          canvas.current.clearCanvas();
          props.setCanvasEmpty(true);
        }}
      >
        Clear
      </button>
      <input id="typeinp" type="range" min="1" max="15" defaultValue="8" step="1"
        onChange={(event) => {
          setStrokeWidth(parseInt(event.target.value));
        }}
      />
    </div>
  );
};

export default Canvas;