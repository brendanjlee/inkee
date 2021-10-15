import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../header/header";
import './joinLobby.css'

function JoinLobby() {
  return (
    <div className='root'>
      <div className='greenSplat'>
        <div className='orangesplat'>
        <CreateHeader/>
          <form className='form-group'>
            <input className='username' type="text" placeholder="enter game ID"/><br />
            <Link to='../prestartLobby/prestartLobby.js'>
              <Button variant='primary'>Join Game</Button>
            </Link>
          </form>
        <Link to='../prestartLobby/prestartLobby.js'>
            <Button variant='primary'>Join Random Game</Button>
        </Link>
        </div>
        </div>
    </div>
  );
}

export default JoinLobby