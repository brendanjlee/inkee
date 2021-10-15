import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CreateHeader from "../header/header";
import './prestartLobby.css'

function PrestartLobby() {
  return (
    <div className='root'>
      <CreateHeader/>
      <div className='content'>
        <div className='game-id'>
          <p>Game ID: 12390283A</p>
        </div>
        <div className='game-link'>
          <p>Share the game link:</p><br/>
          <p>https://www.google.com</p>
        </div>
        <div className='lobby-players'>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </div>
        <Link to='../game/game.js'>
          <Button variant='primary'>Ready</Button>
        </Link>
      </div>
    </div>
  );
}

export default PrestartLobby