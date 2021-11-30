const leven = require('fast-levenshtein');
const GraphemeSplitter = require('grapheme-splitter');
const splitter = new GraphemeSplitter();
const {getGuesserScore} = require('./helpers');

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
    const {roomId, player} = this.socket;
    const userId = player.uid;
    if (messageData === '') {
      this.socket.emit('ERROR', 'Message cannot be empty!');
      return;
    }

    if (rooms[roomId].roundData.currentWord) {
      const distance = leven.get(messageData.toLowerCase(), rooms[roomId].roundData.currentWord.toLowerCase());
      if (distance === 0 && rooms[roomId].users[userId].guessedWord === false) {
        const scoreUpdate = getGuesserScore(rooms[roomId].settings.roundLength, rooms[roomId].roundData.currentTime);
        rooms[roomId].users[userId].score += scoreUpdate;
        rooms[roomId].roundData.totalScore += scoreUpdate;
        
        this.socket.emit('correctGuess', {
          uid: userId,
          message: 'You guessed correctly!!',
        });
        
        this.socket.broadcast.to(this.socket.roomId).emit('userCorrectGuess', {
          message: `${userId} has guessed the word!`,
        });

        this.io.to(this.socket.roomId).emit('scoreUpdate',
          {
            uid: userId,
            score: rooms[roomId].users[userId].score,
          });

        rooms[roomId].users[userId].guessedWord = true;
        return;
      }

      if (distance < 3 && rooms[roomId].users[userId].guessedWord === false) {
        this.socket.emit('closeGuess', {
          uid: userId,
          message: `${messageData} is close, keep trying!`,
        });

        this.socket.broadcast.to(this.socket.roomId).emit('chatMessage',
        {
          uid: userId,
          message: messageData,
        });
        return;
      }
    }

    let eventType = 'chatMessage';
    if (rooms[roomId].users[userId].guessedWord === true) {
      eventType = 'guessedMessage';
    }

    this.io.to(this.socket.roomId).emit(eventType,
      {
        uid: userId,
        message: messageData,
      });
  }
}

module.exports = {
  Message,
};
