import React from 'react'
import Logo from '../assets/inkee-logo.png'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="logo">
        <img style={{width:"150px;"}} src={Logo} alt='inkee-logo'/>
      </div>
      
      <div className='content'>
        {/* username form*/}
        <div className='username'>
          <form>
            <label>Username</label>
            <input type="text"/>
          </form>
        </div>

        {/* Draw Avatar */}
        <div>
          <h1>Avatar Drawing Placeholder</h1>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <Link to="/createLobby">
            <Button variant="primary">Create Private Game</Button>{' '}
          </Link>
          <Link to="/joinLobby">
            <Button variant="primary">Play Online</Button>{' '}
          </Link>
        </div>

      </div>
    </div>
  );
}
export default Home;