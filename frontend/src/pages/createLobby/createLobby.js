import {React, useEffect, useState} from 'react';
import { Link, history } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateHeader from '../../components/header/header';
import { CSVReader } from 'react-papaparse';
import './createLobby.css';

function CreateLobby({socket, history}) {
  // Game Settings
  const [numRounds, setNumRounds] = useState(2);
  const [roundLength, setRoundLength] = useState(30);
  // Custom Words 
  const [textAreaContent, setTextAreaContent] = useState('');
  const [csvContent, setCsvContent] = useState(null);
  window.history.replaceState(null, 'Inkee Create Lobby', '/');

  /**
   * User sets round numbers
   * @param {onChange} event 
   */
  const handleNumRoundChange = (event) => {
    setNumRounds(event.target.value);
  };

  /**
   * User sets round lenght
   * @param {onChange} event 
   */
  const handleRoundLengthChange = (event) => {
    setRoundLength(event.target.value);
  };

  /**
   * User enters custom words in textArea
   * @param {onChange} event 
   */
  const handleTextAreaChange = (event) => {
    let text = event.target.value;
    setTextAreaContent(text); 
  };

  /**
   *  User drops csv file into CSVReader
   * @param {onDrop} event 
   */
  const handleOnDrop = (event) => {
    let words = [];
    for (let i=0; i<event.length; i++) {
      let word = event[i].data;
      if (!words.includes(word[0])) words.push(word[0]);
    }
    setCsvContent(words);
  };

  /**
   * User removes csv file from CSVReader
   * @param {onRemoveFile} event 
   */
  const handleOnRemoveFile = (event) => {
    setCsvContent(null);
  };

  /**
   * Error
   */
  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  /**
   *  Parses through text area content and csv content and adds them to the
   * custom word list.
   * @param {String} textAreaContent 
   * @param {List} csvContent 
   */
  const parseCustomWords = (textAreaContent, csvContent) => {
    console.log('Parse Custom Words');
    let customWords = [];
    if (textAreaContent.length > 0) {
      let lines = textAreaContent.split(/\r\n|\r|\n/);
      for (let i=0; i<lines.length; i++) {
        let line = lines[i].split(/[ ,]+/).filter(Boolean);
        for (let j = 0; j < line.length; j++) {
          const word = line[j].toLowerCase();
          if (!customWords.includes(word)) {
            customWords.push(word);
          }
        }
      }
      console.log('textAreaContent Created');
    }

    if (csvContent != null) {
      for (let i=0; i < csvContent.length; i++) {
        let word = csvContent[i];
        word = word.toLowerCase();
        if (!customWords.includes(word)) {
          customWords.push(word);
        }
      }
      console.log('csvContent Created');
    }

    // delete after sprint reivew
    if (customWords.length < 10 && customWords.length > 0) {
      alert('Entered less than 10 custom words');
    }

    return customWords;
  };

  useEffect(() => {
    socket.on('inviteCode', (inviteCode) => {
      console.log(inviteCode);
      // Join game room generated by server.
      localStorage.setItem('inviteCode', inviteCode);
      history.push({
        pathname: '/prestartLobby'
      });
    });

    return () => {
      socket.off('inviteCode');
    };
  }, [socket, history]);

  /**
   * Submit game configeration to backend
   * @param {onClick} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Populate customWordList
    let customWords = parseCustomWords(textAreaContent, csvContent);

    // create gameConfiguration
    // Use default word list if custom_words is empty
    let gameConfiguration = {
      num_rounds: numRounds,
      round_length: roundLength,
      custom_words: [],
    };

    // add custom words if possible
    if (customWords.length > 0) {
      gameConfiguration['custom_words'] = customWords;
    }

    //console.log(gameConfiguration)

    // create userData
    const userData = {
      uid: localStorage.getItem('username'),
      avatar: 'tempAvatar',
    };
    
    socket.emit('createGame', {
      gameConfiguration,
      userData,
    });
    console.log('socket emit invite code');
  };

  return (
    <div className='lobbyRoot'>
      <form onSubmit={handleSubmit} className="form">
        <select
          id="numRounds"
          name="numRounds"
          onChange={handleNumRoundChange}
          value={numRounds}
          className="select"
        >
          <option hidden={true}>choose rounds</option>
          <option value="1rounds">1</option>
          <option value="2rounds">2</option>
          <option value="3rounds">3</option>
          <option value="4rounds">4</option>
          <option value="5rounds">5</option>
          <option value="6rounds">6</option>
          <option value="7rounds">7</option>
          <option value="8rounds">8</option>
          <option value="9rounds">9</option>
          <option value="10rounds">10</option>
        </select>
        <select
          id="roundLength"
          name="roundLength"
          onChange={handleRoundLengthChange}
          value={roundLength}
          className="select"
        >
          <option hidden={true}>drawing time</option>
          <option value="30seconds">30</option>
          <option value="40seconds">40</option>
          <option value="50seconds">50</option>
          <option value="60seconds">60</option>
          <option value="70seconds">70</option>
          <option value="80seconds">80</option>
          <option value="90seconds">90</option>
          <option value="120seconds">120</option>
          <option value="180seconds">180</option>
        </select>
        <div className='wordlist'>
          <textarea className='words'
            placeholder='enter custom words...'
            value={textAreaContent}
            onChange={handleTextAreaChange}
          >
          </textarea>
          <div className='csvReader'>
            <CSVReader
              onDrop={handleOnDrop}
              onError={handleOnError}
              addRemoveButton
              onRemoveFile={handleOnRemoveFile}
            >
              <span>drop a csv file or upload</span>
            </CSVReader>
          </div>
        </div> 
        <Button variant='primary' onClick={handleSubmit}>start game</Button>
      </form>
    </div>
  );
}

export default CreateLobby;