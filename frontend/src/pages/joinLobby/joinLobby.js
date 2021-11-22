import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CreateHeader from '../../components/header/header';
import './joinLobby.css';
import Sound from '../../assets/buttonClick.mp3';

function JoinLobby({socket, history}) {
  window.history.replaceState(null, 'Inkee Join Lobby', '/');
  useEffect(() => {
    const startGameHandler = (inviteCode) => {
      sessionStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/game',
      });
    };

    const prestartLobbyHandler = (inviteCode) => {
      sessionStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/prestartLobby',
      });
    };

    socket.on('startGame', startGameHandler);
    socket.on('inviteCode', prestartLobbyHandler);

    return () => {
      socket.off('startGame', startGameHandler);
      socket.off('inviteCode', prestartLobbyHandler);
    };
  }, [socket, history]);

  const handleSubmit = (inviteCode = null, joinById) => {
    var ButtonClick = new Audio (Sound);
    ButtonClick.play();
    const userData = {
      userData: {
        uid: sessionStorage.getItem('username'),
        avatar: sessionStorage.getItem('avatar'),
      },
      inviteCode: inviteCode,
    };

    if (joinById && inviteCode === '') {
      alert('Game ID text box is empty!');
    } else if (joinById && inviteCode !== '') {
      userData['inviteCode'] = inviteCode;
      socket.emit('joinRoom', userData);
    } else if (!joinById) {
      socket.emit('joinRandomRoom', userData);
    }
  };

  return (
    <div className='root'>
      <div className='greenSplat'>
        <div className='orangeSplatTwo'>
          <CreateHeader/>
          <form className='form-group'>
            <input id='id_input' className='username' type="text" placeholder="enter game ID..."/><br />
            <Button variant='primary' onClick={() => {
              handleSubmit(document.getElementById('id_input').value, true);
            }}>join with ID</Button>
          </form>
          <Button variant='primary' onClick={() => {
            handleSubmit(document.getElementById('id_input').value, false);
          }}>join random game</Button>
        </div>
      </div>
    </div>
  );
}

export default JoinLobby;