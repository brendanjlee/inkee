import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button} from "react-bootstrap";
// Components
import CreateHeader from "../header/header";
import './createLobby.css'
import { api_url } from "../../config";

function CreateLobby() {
  const [numRounds, setNumRounds] = useState(2);
  const [roundLength, setRoundLength] = useState(30);
  const [inviteCode, setInviteCode] = useState('');
  

  const history = useHistory();

  const handleNumRoundChange = (event) => {
    setNumRounds(event.target.value);
    console.log(`CreateLobby: Num Rounds set - ${event.target.value} rounds.`);
  };

  const handleRoundLengthChange = (event) => {
    setRoundLength(event.target.value);
    console.log(`CreateLobby: Round Length Set - ${event.target.value}`);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        setInviteCode(this.responseText);
        history.push('/prestartLobby?inviteCode=' + inviteCode);
      }
    };

    xhr.open("POST", api_url + '/games', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(
      {
        gameConfiguration: {
          num_rounds: numRounds,
          round_length: roundLength
        },
        userData: {
          uid: 'TEST',
          username: 'TEST',
          avatar: 'TEST'
        }
      }
    ));
  };

  return (
    <div className='root'>
      <CreateHeader />
      <div className='content'>
        <h2 id='title'>Lobby</h2>
        <form className='lobby-creation-div' onSubmit={handleSubmit}>
          <div className="setting-form-group">
              <label for="numRounds">Rounds:</label>
              <select
                id="numRounds"
                name="numRounds"
                onChange={handleNumRoundChange}
                value={numRounds}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
          </div> 
          <div className="setting-form-group">
            <label for="roundLength">Drawing Time:</label>
            <select
              id="roundLength"
              name="roundLength"
              onChange={handleRoundLengthChange}
              value={roundLength}
            >
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="130">130</option>
              <option value="140">140</option>
              <option value="150">150</option>
              <option value="160">160</option>
              <option value="170">170</option>
              <option value="180">180</option>
            </select>
          </div>

          <Button variant='primary' onClick>Start Game</Button>
          <button>send</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLobby