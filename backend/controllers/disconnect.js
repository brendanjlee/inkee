/* global rooms */
const {Game} = require('./game');

/**
 * Handles user disconnect logic for the game.
 */
class Disconnect {
  /**
   * Constructs a new user disconnect handler using io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
  /* istanbul ignore next */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Handles user socket disconnect.
   */
  /* istanbul ignore next */
  onDisconnect() {
    const {roomId, player} = this.socket;
  
    // User disconnected from a live game.
    if (roomId !== undefined && rooms[roomId] !== undefined) {
      if (Object.keys(rooms[roomId].users).length === 1) {
        new Game(this.io, this.socket).clearTimer();
        delete rooms[roomId];
      } else if (player !== undefined) {
        delete rooms[roomId].users[player.uid];
      }
      
      this.io.to(roomId).emit('disconnection', player.uid);
    }
  }
}

module.exports = {
  Disconnect,
};
