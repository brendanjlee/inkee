import React from 'react'
import { useCanvas } from './CanvasContext'

export const ColorPalette = () => {
  const { changeColor } = useCanvas()

  return (
    <div>
      <button id="colorButton" className="color" onClick={changeColor("blue")}></button>
      <button id="colorButton" className="color" onClick={changeColor("red")}></button>
      <button id="colorButton" className="color" onClick={changeColor("green")}></button>
      <button id="colorButton" className="color" onClick={changeColor("yellow")}></button>
      <button id="colorButton" className="color" onClick={changeColor("pink")}></button>
      <button id="colorButton" className="color" onClick={changeColor("orange")}></button>
      <button id="colorButton" className="color" onClick={changeColor("purple")}></button>
      <button id="colorButton" className="color" onClick={changeColor("brown")}></button>
      <button id="colorButton" className="color" onClick={changeColor("black")}></button>
    </div>
  );
}