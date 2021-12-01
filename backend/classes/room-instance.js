const { GameConfiguration } = require('./game-configuration');
const { Round } = require('./round');

class RoomInstance {
  /**
   * Constructs a new class object instance of Room.
   *
   * @param {object} admin the user that created the game.
   * @param {integer} numRounds the number of rounds in the game.
   * @param {integer} roundLength the amount of time for a round.
   * @param {integer} lobbySize the number of people that can fit in a lobby.
   * @param {Array} customWords any custom words being used by the game.
   * @param {boolean} customWordsOnly Whether the game uses only custom words.
   */
  constructor(admin, numRounds, roundLength, isPrivate,
    customWords, customWordsOnly) {
    this.inProgress = false;
    this.admin = admin.uid;
    this.users = {};
    this.users[admin.uid] = admin;
    this.settings = new GameConfiguration(numRounds, roundLength, isPrivate,
      customWords, customWordsOnly);
    this.roundData = new Round();
    this.wordsUsed = [];
    this.currentRound = 0;
  }
};

module.exports = {
  RoomInstance,
};
