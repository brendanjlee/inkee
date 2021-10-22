import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateHeader from "../../components/header/header";
import LobbyForm from '../../components/LobbyForm';
import './joinLobby.css'

function JoinLobby({socket}) {
  return (
    <div className='root'>
      <div className='greenSplat'>
        <div className='orangesplat'>
        <CreateHeader/>
          <LobbyForm/>
        <Link to='../prestartLobby/prestartLobby.js'>
            <Button variant='primary'>join random game</Button>
        </Link>
        </div>
        </div>
    </div>
  );
}

export default JoinLobby