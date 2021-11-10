import React from 'react';
import { useCanvas } from './CanvasContext';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const JoinButton = () => {
  const { exportImage } = useCanvas();

  return (
    <Link to='../joinLobby/joinLobby.js'>
      <Button onClick={exportImage} className='btn' variant="secondary" size='lg'>join game</Button>{' '}
    </Link>
  );
};