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
    socket.emit('startDrawing');
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    socket.emit('finishDrawing');
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (socket) {
      socket.emit('drawingEvent', ({
        x: offsetX,
        y: offsetY,
        color: context.strokeStyle,
        thickness: context.lineWidth,
        drawEvent: nativeEvent,
      }));
    }
    contextRef.current.stroke();
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
    const lineColor = color;
    context.strokeStyle = lineColor;
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
        exportImage,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);