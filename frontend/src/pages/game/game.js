import React, { useEffect } from "react";

//Style
import './game.css'
// Assets
import DrawArea from '../../components/DrawArea';

function Game({socket, history}) {

  // useEffect(() => {
  //   const sendMessage = document.querySelector('#sendMessage');
    
  //   sendMessage.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     const message = this.firstElementChild.value;
  //     this.firstElementChild.value = '';
  //     socket.emit('message', { message });
  //   });
  // }, []);

  socket.on('message', writeMessage);
  return (
    <div className='gameRoot'>
      <div className='purpleSplatTwo'>
        <div className='limeSplat'>
          <div className='inkeeLogo'>
            <div className="topContainer" >
              <div className="word" >word</div>
              <div className="time" > 3:19 </div>
            </div>
            <div className="middleContainer">
              <div className="profiles">profile</div>
              <DrawArea></DrawArea>
              <div className="chat">chat</div>
            </div>
            <div className="sendMessage">
              <input type='text' placeholder="enter guess..."/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function writeMessage({ name = '', message, id }) {
  const p = document.createElement('p');
  const chatBox = document.createTextNode(`${message}`);
  const messages = document.querySelector('.chat');
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