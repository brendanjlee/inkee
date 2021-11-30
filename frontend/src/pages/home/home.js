import './home.css';
import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/inkee-logo.png';
import GameCanvas from '../../components/GameCanvas';
import { Button } from 'react-bootstrap';
import { CanvasProvider } from '../../components/CanvasContext';
import { ClearCanvasButton } from '../../components/ClearCanvasButton';
import { UndoStrokeButton } from '../../components/UndoStroke';
import { RedoStrokeButton } from '../../components/RedoStrokeButton';
import Sound from '../../assets/buttonClick.mp3';

function Home({socket, history}) {
  const query = new URLSearchParams(window.location.search);
  const inviteCode = query.get('gameId');

  if (inviteCode !== null) {
    sessionStorage.setItem('inviteCode', inviteCode);
  }

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    const startGameHandler = (inviteCode) => {
      sessionStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/game',
      });
    };

    const inviteCodeHandler = () => {
      sessionStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/prestartLobby',
      });
    };

    if (socket) {
      socket.on('startGame', startGameHandler);
      socket.on('inviteCode', inviteCodeHandler);
    }

    return () => {
      if (socket) {
        socket.off('startGame', startGameHandler);
        socket.off('inviteCode', inviteCodeHandler);
      }
    };
  }, [socket]);


  const exportCanvasImage = () => {
    const canvas = document.getElementById('canvas');
    const uri = canvas.toDataURL('image/png');

    if (canvas.changed === false) {
      console.log('You haven\'t drawn an avatar! Drawing something nice!');
      alert('You haven\'t drawn an avatar! Drawing something nice!');
      return false;
    }

    sessionStorage.setItem('avatar', uri);
    return true;
  };

  const handleHomeSubmit = (path, inviteCode = null) => {
    const ButtonClick = new Audio (Sound);
    ButtonClick.play();
    const userNameInput = document.getElementById('username_input');
    if (userNameInput.value !== '') {
      sessionStorage.setItem('username', userNameInput.value);
      console.log(userNameInput.value);
    } else {
      alert('Username cannot be empty!');
      return;
    }

    if (!exportCanvasImage()) {
      return;
    }

    if (inviteCode) {
      socket.emit('joinRoom', {
        userData: {
          uid: sessionStorage.getItem('username'),
          avatar: sessionStorage.getItem('avatar'),
        },
        inviteCode: sessionStorage.getItem('inviteCode'),
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  };

  return (
    <div className='root'>
      <CanvasProvider>
        <div className='purpleSplat'>
          <div className='orangeSplat'>
            <div className='header'>
              <img className='logo' src={Logo} alt='inkee-logo'/>
            </div>
            <form>
              <input className='username' id='username_input' type='text' placeholder="enter username..." maxLength={8}/>
            </form>
            <div align="center">
              <div className="homeDrawArea">
                <GameCanvas />
              </div>
              <div>
                <RedoStrokeButton/>
                <UndoStrokeButton />
                <ClearCanvasButton />
              </div>
              <div>
                <Button onClick={() => {
                  handleHomeSubmit('/joinLobby', sessionStorage.getItem('inviteCode')); 
                }} className='btn' variant="secondary" size='lg'>join game</Button>
              </div>
              <div>
                {
                  !sessionStorage.getItem('inviteCode') &&
                <Button onClick={() => {
                  handleHomeSubmit('/createLobby');
                }} className='btn' variant="outline-primary" size='lg'>create game</Button>
                }
              </div>
            </div>
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
}
export default Home;