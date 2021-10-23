import React from 'react'
//Style
import './game.css'
// Assets
import GameCanvas from '../../components/GameCanvas';

function Game() {
    return (
        <div className='background'>
            <div className='inkeeLogo'>
                <div className='limeSplat'>
                    <div className='purpleSplatTwo'>
                        <div className="topContainer" >
                            <div className="word" >Your mom</div>
                            <div className="time" > 3:19 </div>
                        </div>
                        <div className="middleContainer">
                            <GameCanvas/>
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