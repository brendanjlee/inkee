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
    const {roomId, player} = this.socket;

    removePlayerFromGame(roomId, player).then(() => {
      this.io.to(roomId).emit('disconnection', player.uid);
      delete rooms[roomId].users[player.uid];
      if (rooms[roomId].users.size === 0) {
        delete rooms[roomId];
      }
    });
  }
}

module.exports = {
  Disconnect,
};
