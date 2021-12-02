import {React, useEffect, useState} from 'react';
import { Link, history } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateHeader from '../../components/header/header';
import './createLobby.css';
import Sound from '../../assets/buttonClick.mp3';

function CreateLobby({socket, history}) {
  // Game Settings
  const [numRounds, setNumRounds] = useState(undefined);
  const [roundLength, setRoundLength] = useState(undefined);
  
  // Custom Words 
  const [textAreaContent, setTextAreaContent] = useState('');
  const [usingCustomWords, setUsingCustomWords] = useState(undefined);
  const [isPrivate, setIsPrivate] = useState(undefined);
  
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

  const handleCustomWordsCheckChange = (event) => {
    setUsingCustomWords(event.target.value);
  };

  const handlePrivateGameChange = (event) => {
    setIsPrivate(event.target.value);
  };

  useEffect(() => {
    socket.on('inviteCode', (inviteCode) => {
      console.log(inviteCode);
      // Join game room generated by server.
      sessionStorage.setItem('inviteCode', inviteCode);
      sessionStorage.setItem('isAdmin', true);
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
    const ButtonClick = new Audio (Sound);
    ButtonClick.play();
    event.preventDefault();

    // create gameConfiguration
    // Use default word list if custom_words is empty
    const gameConfiguration = {
      numRounds: numRounds,
      roundLength: roundLength,
      isPrivate: isPrivate,
      customWords: [],
      customWordsOnly: usingCustomWords,
    };

    const custom_words = document.getElementById('custom_words').value.split(/[ ,]+/);
    
    if (usingCustomWords === 'yes') {
      if (custom_words.length >= 10) {
        gameConfiguration.customWords = custom_words; 
      } else {
        alert('There must be at least 10 custom words!');
        return;
      }
    } else if (custom_words.length > 0) {
      gameConfiguration.customWords = custom_words; 
    }

    // create userData
    const userData = {
      uid: sessionStorage.getItem('username'),
      avatar: sessionStorage.getItem('avatar'),
    };
    
    console.log(userData.avatar);
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
          <option value={undefined}>choose rounds</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <select
          id="roundLength"
          name="roundLength"
          onChange={handleRoundLengthChange}
          value={roundLength}
          className="select"
        >
          <option value={undefined}>drawing time</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
          <option value={70}>70</option>
          <option value={80}>80</option>
          <option value={90}>90</option>
          <option value={120}>120</option>
          <option value={180}>180</option>
        </select>
        <select
          id="privateGame"
          name="privateGame"
          onChange={handlePrivateGameChange}
          value={isPrivate}
          className="select"
        >
          <option value={undefined}>private game</option>
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
        <select
          id="exclusiveCustomWords"
          name="customWords"
          onChange={handleCustomWordsCheckChange}
          value={usingCustomWords}
          className="select"
        >
          <option value={undefined}>use custom words only</option>
          <option value={false}>no</option>
          <option value={true}>yes</option>
        </select>
        <div className='wordlist'>
          <textarea className='words'
            id='custom_words'
            placeholder='enter comma-separated custom words...'
            value={textAreaContent}
            onChange={handleTextAreaChange}
          >
          </textarea>
        </div> 
        <Button variant='primary' onClick={handleSubmit}>start game</Button>
      </form>
    </div>
  );
}

export default CreateLobby;