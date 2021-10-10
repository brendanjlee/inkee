import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//Style
import './home.css'
// Assets
import Logo from '../../assets/inkee-logo.png'
import tempAvatar from '../../assets/temp_assets/avatarCreationTemp.png'


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
        <div className='avatar-creation'>
          <img className='avatar-img' src={tempAvatar} alt='avatar-placeholder'/>
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