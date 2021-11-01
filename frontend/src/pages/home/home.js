import './home.css'
import React, { useState, useRef } from 'react'
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home({socket, history}) {
  const canvasRef = useRef();
  const [canvasEmpty, setCanvasEmpty] = useState(true);

  const handleHomeSubmit = (path) => {
    const userNameInput = document.getElementById('username_input');
    if (userNameInput.value !== '') {
      localStorage.setItem('username', userNameInput.value);
    } else {
      alert('Username cannot be empty!');
      return;
    }

    if (!canvasEmpty) {
      // canvasRef.current.exportImage("png")
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   }); 
    } else {
      alert('Avatar canvas is empty!');
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
                handleHomeSubmit('../joinLobby/joinLobby.js'); 
              }} className='btn' variant="secondary" size='lg'>join game</Button>{' '}
            </div>
            <div>
              <Button onClick={() => handleHomeSubmit('../createLobby/createLobby.js')} className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;