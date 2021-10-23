import './home.css'
import React, { useRef, useState } from 'react'
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home({socket, history}) {
  const canvas = useRef();
  const [userName, setUsername] = useState('');
  
  const handleSubmit = (route) => {
    // TODO: Upload image to the backend server and retrieve the URL.
    // Push to the next page based on route.
    history.push({
      pathname: route,
      state: {
        username: userName,
        avatar: 'temp_avatar',
      }
    });
    canvas.current.exportImage("png")
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className='root'>
      <div className='purpleSplat'>
        <div className='orangeSplat'>
          <div className='header'>
        <img className='logo' src={Logo} alt='inkee-logo'/>
        </div>
          <form onChange={setUsername}>
            <input className='username' type='text' placeholder="enter username..."/>
          </form>
          <div align="center">
            <Canvas canvas={canvas}></Canvas>
            <div>
              <Button
                onClick={() => handleSubmit('/join')}
                className='btn'
                variant="secondary"
                size='lg'
              >
                join game
              </Button>{' '}
            </div>
            <div>
              <Button
                onClick={() => handleSubmit('/create')}
                className='btn'
                variant="outline-primary"
                size='lg'
              >
                create game
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  export default Home;