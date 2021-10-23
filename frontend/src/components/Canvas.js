import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Canvas = (props) => {
  const [numDrawingEvents, setNumDrawingEvents] = useState(0);
  const canvas = useRef();

  return (
    <div>
      <ReactSketchCanvas 
        ref={canvas}
        width="24em" height="15rem" strokeWidth={4} strokeColor="black" style={{
        border: ".5rem solid black",}} 
        onUpdate={() => {
          setNumDrawingEvents(numDrawingEvents + 1);
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
      <div>
        <Link to='../joinLobby/joinLobby.js'>
          <Button onClick={() => {
            canvas.current.exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }} className='btn' variant="secondary" size='lg'>join game</Button>{' '}
        </Link>
      </div>
      <div>
        <Link to='../createLobby/createLobby.js'>
          <Button onClick={() => {
            canvas.current
              .exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }} className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
        </Link>
      </div>
    </div>
  );
};

export default Canvas;
