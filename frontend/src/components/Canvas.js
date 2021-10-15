import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <div>
        <ReactSketchCanvas 
        ref={this.canvas}
        width="24em" height="15rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}}/>

        <button
          onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }}
        >
          Get Image
        </button>

        <button onClick= {() => {
          this.canvas.current.clearCanvas()
          console.log('cleared')
        }}>
          Clear Canvas
        </button>
      </div>
    );
  }
};

export default Canvas;