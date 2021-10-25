/**
 * Handles storing messages for the game.
 */
class Message {
  /**
   * Constructs a new Message handler using the io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Sends the provided message data to all the connected clients
   * and to the firebase database.
   *
   * @param {string} userId The userId that sent the message to the game.
   * @param {object} messageData the content of the message.
   */
  onMessage(userId, messageData) {
    this.socket.to(socket.roomID).emit('message', userId, messageData);
  }
}

module.exports = {
  Message,
};
