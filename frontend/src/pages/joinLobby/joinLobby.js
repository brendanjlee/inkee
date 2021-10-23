import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../../components/header/header";
import './joinLobby.css'

function JoinLobby({socket, history}) {
  return (
    <div className='root'>
      <div className='greenSplat'>
        <div className='orangeSplatTwo'>
        <CreateHeader/>
          <form className='form-group'>
              <input className='username' type="text" placeholder="enter game ID..."/><br />
              <Link to='../game/game.js'>
                <Button variant='primary'>join with ID</Button>
              </Link>
          </form>
          <Link to='../prestartLobby/prestartLobby.js'>
              <Button variant='primary'>join random game</Button>
          </Link>
          </div>
        </div>
    </div>
  );
}

export default JoinLobby