import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// Components
import CreateHeader from "../header/header";
import './createLobby.css'
import { api_url } from "../../config";

function CreateLobby() {
  const [numRounds, setNumRounds] = useState(1);
  const [roundLength, setRoundLength] = useState(30);

  const handleNumRoundChange = (event) => {
    setNumRounds(event.target.value);
  };

  const handleRoundLengthChange = (event) => {
    setRoundLength(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
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
        <h2>Lobby</h2>
        <form className='lobby-creation-div' onSubmit={handleSubmit}>
          <div className="form-group">
              <label for="numRounds">Rounds:</label>
              <select
                id="numRounds"
                name="numRounds"
                onChange={handleNumRoundChange}
                value={numRounds}
              >
                <option value="1">1</option>
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
          <div className="form-group">
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
              <option value="120">120</option>
              <option value="180">180</option>
            </select>
          </div>
          <div className='wordlist-container'>
            <h2>Word List Placeholder</h2>
          </div> 
          <Link to='/prestartLobby'>
              <Button variant='primary'>Start Game</Button>{' '}
            </Link>
            <button>send</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLobby