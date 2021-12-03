import React, { useEffect, useState } from 'react';
//Style
import './game.css';
// Assets
import GameCanvas from '../../components/GameCanvas';
import { CanvasProvider } from '../../components/CanvasContext';
import { ClearCanvasButton } from '../../components/ClearCanvasButton';
import { UndoStrokeButton } from '../../components/UndoStroke';
import { RedoStrokeButton } from '../../components/RedoStrokeButton';
import { ColorPalette } from '../../components/ColorPalette';
import { UserProfile } from '../../components/UserProfile';
import { StrokeThickness } from '../../components/StrokeThickness';
import { WordSelector } from '../../components/WordSelector';

function Game({socket, history}) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Round specific states.
  const [isDrawer, setIsDrawer] = useState(false);
  const [choosingWords, setChoosingWords] = useState(false);
  const [words, setWords] = useState([]);

  window.history.replaceState(null, 'Inkee',
    `/${sessionStorage.getItem('inviteCode')}`);

  /* Load player routine */
  useEffect(() => {
    const renderUserAvatar = (user) => {
      const userCanvas = document.getElementById(`${user.uid}-avatar`);
      const context = userCanvas.getContext('2d');
      const image = new Image();
      image.src = user.avatar;
      image.onload = () => {
        context.drawImage(image, 0, 0, userCanvas.width, userCanvas.height);
      };
    };

    const renderAvatars = (users) => {
      users.map((user) => {
        renderUserAvatar(user);
      });
    };

    const loadPlayers = (users) => {
      console.log(users);
      setUsers(users);
      renderAvatars(users);
    };

    socket.on('getPlayers', loadPlayers);
  
    const loadNewPlayer = (userData) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, userData];
        return newUsers;
      });
      console.log(userData);
      renderUserAvatar(userData);
    };

    socket.on('newPlayer', loadNewPlayer);

    const disconnectPlayer = (userId) => {
      setUsers((prevUsers) => {
        const newUsers = prevUsers.filter((user) => user.uid !== userId);
        return newUsers;
      });
    };

    socket.on('disconnection', disconnectPlayer);

    socket.emit('getPlayers');

    const handleWordChoices = (words) => {
      console.log(words);
      setWords(words);
      setChoosingWords(true);
    };

    socket.on('chooseWord', handleWordChoices);

    return () => {
      socket.off('getPlayers', loadPlayers);
      socket.off('newPlayer', loadNewPlayer);
      socket.off('disconnection', disconnectPlayer);
      socket.off('chooseWord', handleWordChoices);
    };
  }, [socket]);

  useEffect(() => {
    const sendMessage = document.querySelector('#sendMessage');
    const keyPressFunc = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = sendMessage.value;
        sendMessage.value = '';
        socket.emit('chatMessage', { message });
        console.log(message);
      }
    };
    sendMessage.addEventListener('keypress', keyPressFunc);

    const chatMessageHandler = (data) => {
      console.log(data);
      setMessages([...messages, data]);
      writeMessage({
        name: data.uid,
        message: data.message
      });
    };

    socket.on('chatMessage', chatMessageHandler);

    const closeGuessHandler = (data) => {
      console.log(data);
      setMessages([...messages, data]);
      writeMessage({
        name: data.uid,
        message: data.message,
      }, { closeGuess: true });
    };

    socket.on('closeGuess', closeGuessHandler);

    const correctGuessHandler = (messageData) => {
      console.log(messageData);
      setMessages([...messages, messageData]);
      writeMessage({
        name: messageData.uid,
        message: messageData.message,
      }, { correctGuess: true });
    };

    socket.on('correctGuess', correctGuessHandler);

    const timerHandler = (timerValue) => {
      document.getElementById('timer').innerHTML = `  ${timerValue}  `;
    };

    socket.on('timer', timerHandler);

    const userCorrectGuessHandler = (messageData) => {
      setMessages([...messages, messageData]);
      writeMessage({
        message: messageData.message,
      }, { correctGuess: true });
    };
    socket.on('userCorrectGuess', userCorrectGuessHandler);

    const handleSelectedDrawing = () => {
      document.getElementById('word').innerHTML = 'Your teammate is picking the word!';
    };
  
    socket.on('selectedDrawing', handleSelectedDrawing);

    const guessedMessageHandler = (messageData) => {
      setMessages([...messages, messageData]);
      writeMessage({
        name: messageData.uid,
        message: messageData.message,
      }, { guessedMessage: true });
    };
    socket.on('guessedMessage', guessedMessageHandler);

    const handleWord = (word) => {
      setIsDrawer(true);
      setChoosingWords(false);
      document.getElementById('word').innerHTML = word;
    };

    socket.on('word', handleWord);

    const handleWordToGuess = (word) => {
      let hiddenWord = word.join('&nbsp;');
      hiddenWord = hiddenWord.replace(/\s/g, '&nbsp;');

      document.getElementById('word').innerHTML = hiddenWord;
      console.log(hiddenWord);
    };
    socket.on('wordToGuess', handleWordToGuess);

    const handleEndRound = () => {
      setIsDrawer(false);
      setChoosingWords(false);
      setWords([]);
    };
    socket.on('endRound', handleEndRound);

    const handleDrawingTeamMessage = (messageData) => {
      console.log(messageData);
      if (!messageData.drawingTeam.includes(sessionStorage.getItem('username'))) {
        let wordStr ='Drawer is selecting word.';
        if (messageData.drawingTeam.length > 1) {
          wordStr = 'Drawers are selecting word.';
        }

        document.getElementById('word').innerHTML = wordStr;
      }
      setMessages([...messages, messageData.msg]);
      writeMessage({
        message: messageData.msg,
      }, {serverMessage: true});
    };

    // On drawing and choosing alert
    socket.on('drawingTeam', handleDrawingTeamMessage);
    
    const scoreUpdateHandler = () => {
      socket.emit('getPlayers');
    };

    socket.on('scoreUpdate', scoreUpdateHandler);

    const handleEndGame = (userRanks) => {
      console.log(userRanks);
      sessionStorage.setItem('ranks', userRanks);
      // history.push({
      //   pathname: '/finalScore'
      // });
    };

    socket.on('endGame', handleEndGame);

    return () => {
      socket.off('correctGuess', correctGuessHandler);
      socket.off('word', handleWord);
      socket.off('wordToGuess', handleWordToGuess);
      socket.off('closeGuess', closeGuessHandler);
      socket.off('chatMessage', chatMessageHandler);
      socket.off('guessedMessage', guessedMessageHandler);
      socket.off('timer', timerHandler);
      socket.off('userCorrectGuess', userCorrectGuessHandler);
      socket.off('scoreUpdate', scoreUpdateHandler);
      socket.off('selectedDrawing', handleSelectedDrawing);
      socket.off('endRound', handleEndRound);
      socket.off('drawingTeam', handleDrawingTeamMessage);
      socket.off('endGame', handleEndGame);
      sendMessage.removeEventListener('keypress', keyPressFunc);
    };
  }, [socket, messages]);

  useEffect(() => {
    const handleGameData = (gameData) => {
      const msg = gameData.message;
      setMessages([...messages, msg]);
      console.log(msg);
      writeMessage({
        message: msg,
      }, {serverMessage: true});

      const currentHint = gameData.currentHint;
      let hiddenWord = currentHint.join('&nbsp;');
      hiddenWord = hiddenWord.replace(/\s/g, '&nbsp;');
      document.getElementById('word').innerHTML = hiddenWord;
    };
    socket.on('gameData', handleGameData);
    socket.emit('getGameData');

    return () => {
      socket.off('gameData', handleGameData);
    };
  }, []);

  return (
    <div className='gameRoot'>
      <CanvasProvider socket={socket}>
        <div className='purpleSplatTwo'>
          <div className='limeSplat'>
            <div className="topContainer" >
              <div className='inkeeLogo' />
              {
                choosingWords ?
                  <WordSelector words={words} socket={socket}></WordSelector> :
                  <div id='word' className='word'>
                    Drawer(s) is selecting word.
                  </div>
              }
              <div className="time" id="timer"> 10 </div>
            </div>
            <div className="middleContainer">
              <UserProfile users={users} check={false}/>
              <div className="drawArea">
                <GameCanvas socket={socket} isDrawer={isDrawer} />
              </div>
              <div className="chat" id='chat'></div>
            </div>
            <div className="bottomContainer">
              <div className="sendMessage">
                <input type='text' id='sendMessage' placeholder="enter guess..."/>
              </div>
              {isDrawer &&
                <div className='drawingTools'>
                  <ClearCanvasButton/>
                  <UndoStrokeButton />
                  <RedoStrokeButton />
                  <StrokeThickness />
                  <ColorPalette/>
                </div>
              }
            </div>
          </div>
        
        </div>
      </CanvasProvider>
    </div>
  );
}

const writeMessage = ({ name = '', message}, {correctGuess = false, closeGuess = false, guessedMessage = false, serverMessage = false} = {}) => {
  const p = document.createElement('p');
  const chatBox = document.createTextNode(`${message}`);
  const messages = document.getElementById('chat');
  
  if (name !== '') {
    const span = document.createElement('span');
    span.textContent = `${name}: `;
    span.classList.add('fw-bold');
    p.append(span);
  }

  p.classList.add('p-2', 'mb-0');
  if (closeGuess) {
    p.classList.add('closeAnswer');
  }

  if (correctGuess) {
    p.classList.add('correctAnswer');
  }
  p.append(chatBox);
  
  if (closeGuess) {
    p.classList.add('closeAnswer');
  }

  if (correctGuess) {
    p.classList.add('correctAnswer');
  }

  if (guessedMessage) {
    p.classList.add('guessedMessage');
  }

  if (serverMessage) {
    p.classList.add('serverMessage');
  }

  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
};

export default Game;