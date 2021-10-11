import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactSketchCanvas } from "react-sketch-canvas";
//Style
import './home.css'
// Assets
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';



function Home() {
  return (
    <div className='root'>
      <div className='purpleSplat'>
      <div className='orangeSplat'>
      <div className='header'>
        <img classname='logo' src={Logo} alt='inkee-logo'/>
      </div>
        <form>
          <input className='username' type='text' placeholder="enter username"/>
        </form>
        <div align="center">
        <Canvas></Canvas>
        </div>
        <div>
          <Link to='../joinLobby/joinLobby.js'>
            <Button className='btn' variant="secondary" size='lg'>join game</Button>{' '}
          </Link>
        </div>
        <div>
          <Link to='../createLobby/createLobby.js'>
            <Button className='btn' variant="outline-primary" size='lg'>create game</Button>{' '}
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
export default Home;