import React, { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);
    this.notEmpty = false;
    this.canvas = React.createRef();
  }  

  render() {
    return (
      <div align="center">
        <ReactSketchCanvas 
        ref={this.canvas}
        width="40rem" height="30rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}}/>
      </div>
    );
  }
};

export default Canvas;