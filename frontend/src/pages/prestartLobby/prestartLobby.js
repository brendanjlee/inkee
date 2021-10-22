import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateHeader from "../header/header";
import { useEffect } from "react";
import './prestartLobby.css'

function PrestartLobby() {
  useEffect(() => {
    const copyBtn = document.querySelector('#copy.copyBtn');

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#gameLink').select();
      document.execCommand('copy');
    });
  },[])
  
  return (
    <div className='root'>
      <CreateHeader/>
      <div className='content'>
        <div className='game-id'>
          <p>Game ID: 12390283A</p>
        </div>
         <div class="mt-5">
        <h1 class="text-white text-center">Invite your friends!</h1>
        <div class="input-group mb-3">
            <input type="text" id="gameLink" class="form-control text-center fw-bold bg-white"
                value="http://localhost:3000/" readonly>
            </input>
            <button class="copyBtn" type="button" id="copy">Copy Link</button>
          </div>
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