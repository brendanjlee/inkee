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
      <div className='header'>
        <img classname='logo' src={Logo} alt='inkee-logo'/>
      </div>

      <div className='content'>
        <div className='avatar-creation'>
          <img className='avatar-img' src={tempAvatar} alt='avatar-placeholder'/>
        </div>
        <form>
          <label>Username: </label>
          <input type='text'/>
        </form>
        <div classname='button-div'>
          <Link to='../createLobby/createLobby.js'>
            <Button variant="outline-primary" size='lg'>Create Game</Button>{' '}
          </Link>
          <Link to='../joinLobby/joinLobby.js'>
            <Button variant="secondary" size='lg'>Join Game</Button>{' '}
          </Link>
        </div>
      </div>

      <div classname='footer'>
        <p>CS 307 Inkee Team</p>
      </div>
    </div>
  );
}
export default Home;