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
                            <div>Your mom</div>
                            <p> 3:19 </p>
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