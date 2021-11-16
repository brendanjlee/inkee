import React, { useContext, useRef, useState } from 'react';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children, socket = null }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasEmpty, setCanvasEmpty] = useState(true);
  const [currentState, setCurrentState] = useState({
    x: 0,
    y: 0,
    color: 'black',
    lineThickness: 5,
  });

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
    renderSplashPrompt();
    document.getElementById('canvas').changed = false;
  };

  const renderSplashPrompt = () => {
    if (!socket) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const drawing = new Image(canvas.width, canvas.height);
      drawing.crossOrigin = 'anonymous';
      drawing.onload = () => {
        context.drawImage(drawing, 0, 0, canvas.width / 2, canvas.height / 2);
      };
      drawing.src = 'https://i.ibb.co/z4Gb7Sw/output-onlinepngtools-1.png';
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    if (canvasEmpty) {
      clearCanvas(false);
      setCanvasEmpty(false);
    }
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    document.getElementById('canvas').changed = true;
    const tempState = currentState;
    tempState.x = offsetX;
    tempState.y = offsetY;
    setCurrentState(tempState);
  };

  const finishDrawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    draw(currentState.x, currentState.y, offsetX, offsetY,
      currentState.lineThickness, currentState.color, true);
    setIsDrawing(false);
  };

  const inDrawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    draw(currentState.x, currentState.y, offsetX, offsetY,
      currentState.lineThickness, currentState.color, true);
    
    const tempState = currentState;
    tempState.x = offsetX;
    tempState.y = offsetY;
    setCurrentState(tempState);
  };

  const draw = (x0, y0, x1, y1, lineThickness, color, emit) => { //{ nativeEvent }) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x0, y0);
    contextRef.current.lineTo(x1, y1);
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = lineThickness;
    contextRef.current.stroke();

    if (socket && emit) {
      socket.emit('drawingEvent', {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        lineThickness: lineThickness,
        color: color,
      });
    }
  };

  const undoStroke = (emit) => {
    contextRef.current.undo();

    if (emit && socket) {
      socket.emit('undo');
    }
  };

  const redoStroke = (emit) => {
    contextRef.current.undo();

    if (emit && socket) {
      socket.emit('redo');
    }
  };

  const clearCanvas = (emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasEmpty(true);
    
    document.getElementById('canvas').changed = false;

    if (socket && emit) {
      socket.emit('clearCanvas');
    }
  };

  const changeColor = color => () => {
    const tempState = currentState;
    tempState.color = color;
    setCurrentState(tempState);
  };

  const changeLineWidth = (lineWidthValue) => {
    const tempState = currentState;
    tempState.lineThickness = lineWidthValue;
    setCurrentState(tempState);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        prepareCanvas,
        startDrawing,
        inDrawing,
        finishDrawing,
        clearCanvas,
        changeColor,
        changeLineWidth,
        draw,
        undoStroke,
        redoStroke,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);