import React, { useContext, useRef, useState } from 'react';
const CanvasContext = React.createContext();

export const CanvasProvider = ({ children, socket = null }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const undoList = useRef([]);
  const redoList = useRef([]);
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
      drawing.src = 'https://i.imgur.com/XhUhmR7.png';
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!socket && canvasEmpty) {
      clearCanvas(false);
      setCanvasEmpty(false);
    }

    setIsDrawing(true);
    document.getElementById('canvas').changed = true;
    const tempState = currentState;
    tempState.x = offsetX;
    tempState.y = offsetY;
    setCurrentState(tempState);
    saveCanvasState();
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
    contextRef.current.closePath();

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

  // Saves the current state of canvas
  const saveCanvasState = (list, keep_redo) => {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
      redoList.current = []
    }
    (list || undoList.current).push(document.getElementById('canvas').toDataURL());
  }

  // Restore the canvas for redo or undo
  const restoreCanvasState = (pop, push) => {
    if (pop.length) {
      saveCanvasState(push, true);
      let restore_state = pop.pop();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let drawing = new Image(canvas.width, canvas.height);
      drawing.src = restore_state;
      drawing.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(drawing, 0, 0, canvas.width / 2, canvas.height / 2);
      }
    }
  }

  const undo = (emit) => {
    console.log('undo');
    restoreCanvasState(undoList.current, redoList.current);

    if (emit && socket) {
      socket.emit('undo');
    }
  };

  const redo = (emit) => {
    console.log('redo')
    restoreCanvasState(redoList.current, undoList.current);

    if (emit && socket) {
      socket.emit('redo');
    }
  };

  const clearCanvas = (emit) => {
    console.log('clearCanvas');
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasEmpty(true);
    document.getElementById('canvas').changed = false;

    undoList.current = [];
    redoList.current = [];

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
        undo,
        redo,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);