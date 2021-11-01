import React from 'react'
import { useCanvas } from './CanvasContext'

export const ExportImage = () => {
  const { exportImage } = useCanvas()

  return (
    <div>
      <button onClick={exportImage}></button>
    </div>
  );
}