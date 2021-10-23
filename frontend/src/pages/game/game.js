import React from 'react'
//Style
import './game.css'
// Assets
import DrawArea from '../../components/DrawArea';

function Game() {
  return (
    <div className='gameRoot'>
      <div className='purpleSplatTwo'>
        <div className='limeSplat'>
          <div className='inkeeLogo'>
            <div className="topContainer" >
              <div className="word" >Random</div>
              <div className="time" > 3:19 </div>
            </div>
            <div className="middleContainer">
              <DrawArea></DrawArea>
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