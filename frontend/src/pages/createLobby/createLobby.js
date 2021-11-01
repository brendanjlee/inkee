import React, { useState } from "react";
import { Link, history } from "react-router-dom";
import { Button } from "react-bootstrap";
// Components
import CreateHeader from "../../components/header/header";
import CSVReader2 from "../../components/CSVReader2";
import './createLobby.css'

function CreateLobby({socket, history}) {
  const [numRounds, setNumRounds] = useState(2);
  const [roundLength, setRoundLength] = useState(30);

  // if (localStorage.getItem('username') === null || localStorage.getItem('avatar') === null) {
  //   history.push({
  //     pathname: '/'
  //   });
  // }
  const [customWordBox, setCustomWords] = useState('');

  const handleNumRoundChange = (event) => {
    //console.log(`Num Rounds: ${event.target.value}`);
    setNumRounds(event.target.value);
  };

  const handleRoundLengthChange = (event) => {
    //console.log(`Round Length: ${event.target.value}`);
    setRoundLength(event.target.value);
  };

  const handleCustomWordChange = (event) => {
    let customWordString = event.target.value;
    setCustomWords(customWordString);
  }

  const handleCustomWords = (customWordBox) => {
    let customWordsList = [];
    // Parse Custom Words if present
    if (customWordBox.length > 0) {
      let lines = customWordBox.split(/\r\n|\r|\n/);
      for (let i = 0; i < lines.length; i++) {
        // prase if each lime has more than one word
        let line = lines[i].split(/[ ,]+/).filter(Boolean);
        for (let j = 0; j < line.length; j++) {
          const word = line[j].toLowerCase();
          if (customWordsList.includes(word) === false) customWordsList.push(word);
        }
      }
    } 
    return customWordsList;
  }
  
  const handleSubmit = (event) => {
    console.log('submit')
    event.preventDefault();
    console.log('Form Submit');
    console.log(`Submit: numRounds: ${numRounds}`);
    console.log(`Submit: roundLength: ${roundLength}`);

    let customWordsList = handleCustomWords(customWordBox);

    console.log(`Custom words: ${customWordsList}`);
    
    // Game configuration setup
    let gameConfiguration = {
      num_rounds: numRounds,
      round_length: roundLength,
      custom_words: '',
    }
    // add custom words if possible
    if (customWordsList.length > 0) {
      gameConfiguration['custom_words'] = customWordsList;
    }
    
    // send
    socket.emit('createGame', {
      gameConfiguration,
      userData: {
        username: history.location.state.username,
        avatar: history.location.state.avatar,
      },
    });

    socket.on('inviteCode', (inviteCode) => {
      // Join game room generated by server.
      socket.emit('joinRoom', inviteCode);

      history.push({
        pathname: '/prestartLobby'
      });
      localStorage.setItem('inviteCode', inviteCode);
    });
  };

  return (
    <div className='root'>
      <CreateHeader />
      <div className='content'>
        <h2>Select Game Settings</h2>
        <form className='lobby-creation-form' onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="numRounds">Rounds: </label>
              <br/>
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
          <div className="form-group">
            <label htmlFor="roundLength">Drawing Time (seconds): </label>
            <br/>
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
          <div className='wordlist-container'>
            <label>Custom Words:</label>
            <br/>
            <textarea
              placeholder='Enter Custom Words...'
              value={customWordBox}
              onChange={handleCustomWordChange}
              >
            </textarea>
            <CSVReader2/>
          </div> 
          <Button onClick={handleSubmit}>Create Game</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateLobby