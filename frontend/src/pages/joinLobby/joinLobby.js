import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../../components/header/header";
import './joinLobby.css'

function JoinLobby({socket, history}) {
  return (
    <div className='root'>
      <div className='greenSplatLobby'>
        <div className='orangeSplatLobby'>
        <CreateHeader/>
          <form className='form-group'>
              <input className='username' type="text" placeholder="enter game ID..."/><br />
              <Button>join with ID</Button>
          </form>
          <Link to='../prestartLobby/prestartLobby.js'>
              <Button variant='primary'>join random game</Button>
          </Link>
          <Link to='../game/game.js'>
              <Button variant='primary'>temp</Button>
          </Link>
          </div>
        </div>
    </div>
  );
}

export default JoinLobby