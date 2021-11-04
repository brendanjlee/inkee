import React from 'react'
//Style
import './game.css'
// Assets
import GameCanvas from '../../components/GameCanvas';
import { CanvasProvider } from "../../components/CanvasContext";
import { ClearCanvasButton } from "../../components/ClearCanvasButton";
import { ColorPalette } from "../../components/ColorPalette";
import { UserProfile } from "../../components/UserProfile";

function Game() {
  return (
    <div className='gameRoot'>
      <CanvasProvider>
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
              <div className="chat">chat</div>
            </div>
            <div className="bottomContainer">
              <input type='text' placeholder="enter guess..."/>
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
export default Game