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
};

module.exports = {
  Game,
};
