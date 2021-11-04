const {writeMessage} = require('../firebase/game-handler');
const leven = require('fast-levenshtein');

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
   * @param {object} messageData the content of the message.
   */
  onMessage(messageData) {
    const userId = this.socket.player.uid;
    if (messageData === '') {
      this.socket.emit('ERROR', 'Message cannot be empty!');
    } else {
      const distance = leven.get(messageData, 'TestWord');

      if (distance === 0) {
        this.socket.emit('correctGuess', {
          uid: userId,
          message: 'You guessed correctly!!',
        });
      } else {
        if (distance < 3) {
          this.socket.emit('closeGuess', {
            uid: userId,
            message: 'So close, keep trying!!',
          });
        }

        writeMessage(userId, this.socket.roomId, messageData).then(() => {
          this.io.to(this.socket.roomId).emit('chatMessage',
              {
                uid: userId,
                message: messageData,
              });
        });
      }
    }
  }
}

module.exports = {
  Message,
};
