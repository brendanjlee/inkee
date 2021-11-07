import React from 'react'
import { useCanvas } from './CanvasContext'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const CreateButton = () => {
  const { exportImage } = useCanvas()

  return (
    <Link to='../createLobby/createLobby.js'>
        <Button onClick={exportImage} className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
    </Link>
  );
}