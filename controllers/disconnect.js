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
      this.socket.to(roomId).emit('disconnection', player.uid);
      this.socket.disconnect();

      if (this.io.sockets.adapter.rooms.get(roomId).size === 0) {
        this.socket.to(roomId).emit('endgame');
      }
    });
  }
}

module.exports = {
  Disconnect,
};
