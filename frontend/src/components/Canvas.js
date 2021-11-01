import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function Canvas(props) {
  const canvas = props.canvas;

  return (
    <div>
      <ReactSketchCanvas 
        ref={canvas}
        width="24em" height="15rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}} 
        onUpdate={(update) => {
          if (update.length !== 0) {
            props.setCanvasEmpty(false);
          }
        }}
      />
      <button
        className="btn2"
        onClick={() => {
          canvas.current.clearCanvas();
          props.setCanvasEmpty(true);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Canvas;