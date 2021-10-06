import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../header/header";
import './joinLobby.css'

function JoinLobby() {
  return (
    <div className='root'>
      <CreateHeader />
      <div className='content'>
        <h2>Join a Lobby or Random Game</h2>
        <div className='lobby-form'>
          <form classNam='form-group'>
            <label for="game-id">Enter a Game ID:</label>
            <input type="text" /><br />
            <Link to='../prestartLobby/prestartLobby.js'>
              <Button variant='primary'>Join Game</Button>
            </Link>
          </form>
        </div>
        <Link to='../prestartLobby/prestartLobby.js'>
            <Button variant='primary'>Join Random Game</Button>
        </Link>
      </div>
    </div>
  );
}

export default JoinLobby