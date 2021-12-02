/** Represents the configuration settings of games. */
class GameConfiguration {
  /**
   * Constructs a new game configuration object.
   *
   * @param {number} numRounds the number of rounds that will be played.
   * @param {number} roundLength number of seconds that each round will last
   * @param {boolean} isPrivate game is private if true, public otherwise.
   * @param {Array} customWords the custom words used in the game.
   * @param {boolean} customWordsOnly indicates that the user wants to only use custom words.
   */
  /* istanbul ignore next */
  constructor(numRounds = 3, roundLength = 30, isPrivate = false,
    customWords = [], customWordsOnly = false) {
    this.numRounds = numRounds;
    this.roundLength = roundLength;
    this.isPrivate = isPrivate;
    this.customWords = customWords;
    this.customWordsOnly = customWordsOnly;
  }
}

module.exports = {
  GameConfiguration,
};
