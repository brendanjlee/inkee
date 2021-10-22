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
      <div>
        <ReactSketchCanvas 
        ref={this.canvas}
        width="24em" height="15rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}}/>
        <br/>
        <button className="btn2"
          onClick={() => {
            this.canvas.current.clearCanvas();
            console.log('Canvas.js: canvas cleared');
          }}hub
        >
          Clear
        </button>
        <div>
            <Link to='../joinLobby/joinLobby.js'>
              <Button onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }}hub className='btn' variant="secondary" size='lg'>join game</Button>{' '}
            </Link>
          </div>
          <div>
            <Link to='../createLobby/createLobby.js'>
              <Button onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }}hub className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
            </Link>
          </div>
      </div>
    );
  }
};

export default Canvas;