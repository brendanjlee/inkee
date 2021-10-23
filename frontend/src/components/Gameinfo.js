import React from "react";
import { Component } from "react";

class GameLink extends React.Component {
  render() {
    return (
      <div className='invite-container'>
        <div className='title'>Share the Invite Link!</div>
        <div className='invite-input'>
          <div id='link'>
            {this.props.game_url}
          </div>
        </div>
      </div>
    );
  }
}

export default GameLink