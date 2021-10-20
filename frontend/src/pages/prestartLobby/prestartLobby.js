import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CreateHeader from "../header/header";
import GameLink from "../../components/Gameinfo";
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
          <GameLink game_url='www.google.com'/>
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