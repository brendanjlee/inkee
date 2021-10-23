import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function Canvas(props) {
  const [numDrawingEvents, setNumDrawingEvents] = useState(0);
  const canvas = props.canvas;

  return (
    <div>
      <ReactSketchCanvas 
        ref={canvas}
        width="24em" height="15rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}} 
        onUpdate={(update) => {
          if (update.length !== 0) {
            setNumDrawingEvents(numDrawingEvents + 1);
          }
        }}
      />
      <button
        className="btn2"
        onClick={() => {
          canvas.current.clearCanvas();
          setNumDrawingEvents(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Canvas;
