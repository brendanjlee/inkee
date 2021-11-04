import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children, socket = null }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [canvasEmpty, setCanvasEmpty] = useState(true);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    
    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setCanvasEmpty(false);
    if (socket) {
      socket.emit('startDrawing', {
        x: offsetX,
        y: offsetY,
      });
    }
  };

  const startDrawingSocket = (drawingData) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(drawingData.x, drawingData.y);
    setIsDrawing(true);
    setCanvasEmpty(false);
  };

  const finishDrawingSocket = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const drawSocket = (drawingData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = drawingData.thickness;
    context.strokeStyle = drawingData.color;
    contextRef.current.lineTo(drawingData.x, drawingData.y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    if (socket) {
      socket.emit('finishDrawing');
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    console.log('drawing');
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current.stroke();

    if (socket) {
      socket.emit('drawingEvent', {
        x: offsetX,
        y: offsetY,
        thickness: context.lineWidth,
        color: context.strokeStyle,
      });
    }
  };

  const clearCanvasSocket = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    setCanvasEmpty(true);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    setCanvasEmpty(true);
    if (socket) {
      socket.emit('clearCanvas');
    }
  }

  const changeColor = color => () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
  }

  const changeLineWidth = (lineWidthValue) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = lineWidthValue;
  }

  const exportImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const uri = canvas.toDataURL("image/png");
    
    if (canvasEmpty) {
      throw 'Canvas is empty!';
    }
    console.log(uri);
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        changeColor,
        changeLineWidth,
        exportImage,
        startDrawingSocket,
        finishDrawingSocket,
        drawSocket,
        clearCanvasSocket,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);