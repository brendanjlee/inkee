import React from "react";
import '../styles/prestartLobby.css'

function prestartLobby() {
  return (
    <div>
      <div className='prestartLobby'>
        <div className='idContainer'>
          {/* Add component for id text */}
          <h3>game id generation placeholder</h3>
        </div>
        <div className='linkContainer'>
          {/* Add component for game link generation */}
          <h3>Game link generation placeholder</h3>
        </div>
        <div className='playersLobby'>
          {/* Include componenet for showing players in lobby*/}
          <div className='playerLobbyPlaceHolder'></div>
          <p>Players in Lobby</p>
        </div>
      </div>
    </div>
  );
}

export default prestartLobby