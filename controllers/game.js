const {updateGameStatus} = require('../firebase/game-handler');

/**
 * Handles game logic for the game.
 */
class Game {
  /**
   * Constructs the Game object using the io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Starts the game and notifies connected clients.
   */
  startGame() {
    updateGameStatus(this.socket.roomId, true).then(() => {
      rooms[this.socket.roomId].in_progress = true;
      this.io.to(this.socket.roomId).emit('startGame');
    });
  }
};

module.exports = {
  Game,
};
