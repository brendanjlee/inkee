import React from "react";

function GameLink(props) {
  return (
    <div className='invite-container'>
      <div className='title'>Share the Invite Link!</div>
      <div className='invite-input'>
        <div id='link'>
          {props.game_url}
        </div>
      </div>
    </div>
  );
}

export default GameLink