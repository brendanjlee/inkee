const {removePlayerFromGame} = require('../firebase/game-handler');

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
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Handles user socket disconnect.
   */
  onDisconnect() {
    const {socket} = this;
    const {roomID, player} = socket;

    removePlayerFromGame(roomID, player).then(() => {
      socket.to(roomID).emit('disconnect', player.uid);
      socket.disconnect();
    });
  }
}

module.exports = {
  Disconnect,
};
