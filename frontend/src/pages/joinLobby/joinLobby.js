import React from "react";

function JoinLobby() {
  return (
    <div>
      <div className="joinLobby">
        <label for="game-id">Enter a Game ID:</label>
        <input type="text" />
        <button>Play</button>
      </div>
    </div>
  );
}

export default JoinLobby