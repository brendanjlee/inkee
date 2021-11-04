import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../../components/header/header";
import './joinLobby.css'

function JoinLobby({socket, history}) {
  const handleSubmit = (inviteCode = null, joinById) => {
    const userData = {
      userData: {
        uid: localStorage.getItem('username'),
        avatar: 'tempAvatar',
      },
      inviteCode: inviteCode,
    };

    socket.on('ERROR', (msg) => {
      alert(msg);
    });

    socket.on('startGame', (inviteCode) => {
      localStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/game',
      });
    });

    socket.on('inviteCode', (inviteCode) => {
      localStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/prestartLobby',
      });
    });

    if (joinById && inviteCode === '') {
      alert("Game ID text box is empty!");
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

export default JoinLobby