import React, { useEffect, useState } from 'react'
//Style
import './game.css'
// Assets
import GameCanvas from '../../components/GameCanvas';
import { CanvasProvider } from "../../components/CanvasContext";
import { ClearCanvasButton } from "../../components/ClearCanvasButton";
import { ColorPalette } from "../../components/ColorPalette";
import { UserProfile } from "../../components/UserProfile";

function Game({socket, history}) {
  const [messages, setMessages] = useState([]);

  // Socket game handlers.
  useEffect(() => {
    socket.on('drawingEvent', (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    const sendMessage = document.querySelector('#sendMessage');
    
    sendMessage.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = this.firstElementChild.value;
        this.firstElementChild.value = '';
        socket.emit('chatMessage', { message });
      }
    });

    socket.on('chatMessage', (data) => {
      console.log(data);
      setMessages([...messages, data]);
      writeMessage({
        name: data.uid,
        message: data.message
      });
    });
  }, [])

  return (
    <div className='gameRoot'>
      <CanvasProvider socket={socket}>
        <div className='purpleSplatTwo'>
          <div className='limeSplat'>
            <div className='inkeeLogo'>
              <div className="topContainer" >
                <div className="word" >word</div>
                <div className="time" > 3:19 </div>
              </div>
              <div className="middleContainer">
                <UserProfile/>
                <div className="drawArea">
                  <GameCanvas/>
                </div>
                <div className="chat" id='chat'></div>
              </div>
              <div className="bottomContainer">
                <div className="sendMessage" id="sendMessage">
                  <input type='text' placeholder="enter guess..."/>
                </div>
                <ClearCanvasButton/>
                <ColorPalette/>
              </div>
            </div>
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
}

function writeMessage({ name = '', message}) {
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
  p.append(chatBox);
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

export default Game