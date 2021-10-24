/** Represents the configuration settings of games. */
class GameConfiguration {
  /**
   * Constructs a new game configuration object.
   *
   * @param {number} num_rounds the number of rounds that will be played.
   * @param {number} round_length number of seconds that each round will last
   * @param {number} lobby_size the max number of users that can join the lobby.
   * @param {boolean} is_private_game game is private if true, public otherwise.
   * @param {boolean} profanity_filter_enabled enables the chat profanity filter
   */
  /* eslint-disable */
  constructor(num_rounds = 1, round_length = 60, lobby_size = 1,
    is_private_game = false, profanity_filter_enabled = false) {
    this.num_rounds = num_rounds;
    this.round_length = round_length;
    this.lobby_size = lobby_size;
    this.is_private_game = is_private_game;
    this.profanity_filter_enabled = profanity_filter_enabled;
  }
  /* eslint-enable */

  /**
   * Constructs a GameConfiguration object from deserialized JSON object.
   *
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} a GameConfiguration object.
   */
  deserialize(obj) {
    return new GameConfiguration(obj.num_rounds, obj.round_length,
        obj.lobby_size, obj.is_private_game, obj.profanity_filter_enabled);
  }
}

module.exports = {
  GameConfiguration,
};
