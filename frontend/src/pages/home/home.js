import './home.css'
import React, { useRef } from 'react'
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home({socket, history}) {
  const canvas = useRef();

  return (
    <div className='root'>
      <div className='purpleSplat'>
        <div className='orangeSplat'>
          <div className='header'>
        <img className='logo' src={Logo} alt='inkee-logo'/>
        </div>
          <form>
            <input className='username' type='text' placeholder="enter username..."/>
          </form>
          <div align="center">
            <Canvas canvas={canvas}></Canvas>
            <div>
              <Link to='../joinLobby/joinLobby.js'>
                <Button onClick={() => {
                  canvas.current.exportImage("png")
                    .then(data => {
                      console.log(data);
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }} className='btn' variant="secondary" size='lg'>join game</Button>{' '}
              </Link>
            </div>
            <div>
              <Link to='../createLobby/createLobby.js'>
                <Button onClick={() => {
                  canvas.current
                    .exportImage("png")
                    .then(data => {
                      console.log(data);
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }} className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  export default Home;