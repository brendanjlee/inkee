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
    // eslint-disable-next-line
    const {io, socket} = this;
    // eslint-disable-next-line
    const {roomID} = socket;
    if (socket.player) {
      socket.player.id = socket.id;
      socket.to(socket.roomID).emit('disconnection', socket.player);
    }

    // Handle socket clean up.
  }
}

module.exports = {
  Disconnect,
};
