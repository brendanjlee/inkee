import React from 'react'
//Style
import './game.css'
// Assets
import GameCanvas from '../../components/GameCanvas';
import { CanvasProvider } from "../../components/CanvasContext";

function Game() {
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
                <CanvasProvider>
                  <GameCanvas/>
                </CanvasProvider>
              <div className="chat">chat</div>
            </div>
            <div className="bottomContainer">
              <input type='text' placeholder="enter guess..."/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game