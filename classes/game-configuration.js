/** Represents the configuration settings of games. */
class GameConfiguration {
  /**
   * Constructs a new game configuration object.
   * 
   * @param {number} numRounds the number of rounds that will be played.
   * @param {number} roundLength the number of seconds that each round will last.
   * @param {number} lobbySize the max number of users that can join the lobby.
   * @param {boolean} privateGame game is private if true, public otherwise.
   * @param {Object} lobbyOwner the owner/admin of the game lobby.
   * @param {boolean} profanityFilter enables the chat profanity filter if true.
   */
  constructor(numRounds = 1, roundLength = 60, lobbySize = 1,
    privateGame = false, profanityFilter = false) {
      this.numRounds = numRounds;
      this.roundLength = roundLength;
      this.lobbySize = lobbySize;
      this.privateGame = privateGame;
      this.profanityFilter = profanityFilter;
  }

  /**
   * Constructs a GameConfiguration object from deserialized JSON object.
   * 
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} a GameConfiguration object.
   */
   deserialize(obj) {
    return new GameConfiguration(obj.numRounds, obj.roundLength, obj.lobbySize, obj.privateGame, obj.profanityFilter);
  }
}

module.exports = {
  GameConfiguration, 
}
