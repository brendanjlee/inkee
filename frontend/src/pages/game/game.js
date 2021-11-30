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
  const [isDrawer, setIsDrawer] = useState(false);
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

    return () => {
      socket.off('getPlayers', loadPlayers);
      socket.off('newPlayer', loadNewPlayer);
      socket.off('disconnection', disconnectPlayer);
    };
  }, [socket]);

  /* Send Message Routine */
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

    const guessedMessageHandler = (messageData) => {
      setMessages([...messages, messageData]);
      writeMessage({
        name: messageData.uid,
        message: messageData.message,
      }, { guessedMessage: true });
    };
    socket.on('guessedMessage', guessedMessageHandler);


    // On drawing and choosing alert
    socket.on('drawingTeam', ( messageData ) => {
      setMessages([...messages, messageData]);
      writeMessage({
        message: messageData.message,
      }, { serverMessage: true});
    });

    const scoreUpdateHandler = (scoreUpdate) => {
      const uid = scoreUpdate.uid;
      const newScore = scoreUpdate.score;

      const tempUsers = users;
      const matchingUserIdx = tempUsers.findIndex((user => user.uid === uid));
      tempUsers[matchingUserIdx].score = newScore;

      setUsers(tempUsers);
    };

    socket.on('scoreUpdate', scoreUpdateHandler);

    return () => {
      socket.off('correctGuess', correctGuessHandler);
      socket.off('closeGuess', closeGuessHandler);
      socket.off('chatMessage', chatMessageHandler);
      socket.off('guessedMessage', guessedMessageHandler);
      socket.off('timer', timerHandler);
      socket.off('userCorrectGuess', userCorrectGuessHandler);
      socket.off('scoreUpdate', scoreUpdateHandler);
      sendMessage.removeEventListener('keypress', keyPressFunc);
    };
  }, [socket, messages]);

  //On hide word Test
  useEffect(() => {
    socket.on('hideWord', ({ word }) => {
      const p = document.createElement('p');
      p.textContent = word;
      p.classList.add('lead', 'fw-bold', 'mb-0');
      p.style.letterSpacing = '0.5em';
      document.querySelector('#word').textContent = 'TESTTEST';
      document.querySelector('#word').innerHTML = '';
      document.querySelector('#word').append(p);
      document.querySelector('#word').textContent = 'TESTTEST';
    });
    return () => {
    };
  }, [socket]);


  return (
    <div className='gameRoot'>
      <CanvasProvider socket={socket}>
        <div className='purpleSplatTwo'>
          <div className='limeSplat'>
            <div className="topContainer" >
              <div className='inkeeLogo' />
              <WordSelector></WordSelector>
              <div className="time" id="timer"> 3:19 </div>
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
                  <UndoStrokeButton/>
                  <RedoStrokeButton/>
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