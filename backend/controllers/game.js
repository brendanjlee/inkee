/* global rooms */

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
    rooms[this.socket.roomId].inProgress = true;
    this.io.to(this.socket.roomId).emit('startGame');
  }

  /**
   * Starts the round and notifies connected clients.
   */
  startRound() {
    const {roomId, player} = this.socket;
    this.io.to(roomId).emit('startRound');
    this.startTimer();
  }

  /**
   * Start room session timer.
   */
  startTimer() {
    let count = rooms[this.socket.roomId].roundLength;
    rooms[this.socket.roomId].currentTime = count;
    this.io.to(this.socket.roomId).emit('timer', count);
    const interval = setInterval(() => {
      count--;
      rooms[this.socket.roomId].currentTime = count;
      this.io.to(this.socket.roomId).emit('timer', count);
      if (count === 0) {
        this.io.to(this.socket.roomId).emit('endRound');
        rooms[this.socket.roomId].roundInProgress = false;
        rooms[this.socket.roomId].currentTimer = 0;
        clearInterval(interval);
      }
    }, 1000);
    rooms[this.socket.roomId].currentTimer = interval;
  }
}

module.exports = {
  Game,
};
