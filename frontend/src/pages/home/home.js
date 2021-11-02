import './home.css'
import React, { useState, useRef } from 'react'
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';
import { Button } from 'react-bootstrap';

function Home({socket, history}) {
  const canvasRef = useRef();
  const [canvasEmpty, setCanvasEmpty] = useState(true);
  const query = new URLSearchParams(window.location.search);
  const inviteCode = query.get('gameId');

  if (inviteCode !== null) {
    localStorage.setItem('inviteCode', inviteCode);
  }

  const handleHomeSubmit = (path, inviteCode = null) => {
    const userNameInput = document.getElementById('username_input');
    if (userNameInput.value !== '') {
      localStorage.setItem('username', userNameInput.value);
      console.log(userNameInput.value);
    } else {
      alert('Username cannot be empty!');
      return;
    }

    if (inviteCode) {
      socket.emit('joinRoom', {
        userData: {
          uid: localStorage.getItem('username'),
          avatar: 'tempAvatar',
        },
        inviteCode: localStorage.getItem('inviteCode'),
      });

      socket.on('inviteCode', () => {
        history.push({
          pathname: '/prestartLobby',
        });
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  };

  return (
    <div className='root'>
      <div className='purpleSplat'>
        <div className='orangeSplat'>
          <div className='header'>
          <img className='logo' src={Logo} alt='inkee-logo'/>
          </div>
          <form>
            <input className='username' id='username_input' type='text' placeholder="enter username..."/>
          </form>
          <div align="center">
            <Canvas canvas={canvasRef} canvasEmpty={canvasEmpty} setCanvasEmpty={setCanvasEmpty}></Canvas>
            <div>
              <Button onClick={() => {
                handleHomeSubmit('/joinLobby', localStorage.getItem('inviteCode')); 
              }} className='btn' variant="secondary" size='lg'>join game</Button>{' '}
            </div>
            <div>
              {
                !localStorage.getItem('inviteCode') &&
                <Button onClick={() => {
                  handleHomeSubmit('/createLobby')
                }} className='btn' variant="outline-primary" size='lg'>create game</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;