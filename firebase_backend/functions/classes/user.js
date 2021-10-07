/** Represents a game user. */
class User {
  /**
   * Constructs a new User object.
   * 
   * @param {string} uid the username of the user.
   * @param {string} username the unique ID tag associated with the user.
   * @param {boolean} isAdmin boolean denoting if the user is admin of the game.
   * @param {string} gameId the game ID that the user is associated with.
   * @param {string} avatar the URL where the user's avatar is located.
   * @param {number} score the score of the user.
   */
  constructor(uid, username, isAdmin, gameId, avatar, score = 0) {
    this.uid = uid;
    this.username = username;
    this.gameId = gameId;
    this.isAdmin = isAdmin;
    this.avatar = avatar;
    this.score = score;
  }

  /**
   * Constructs a User object from deserialized JSON object.
   * 
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} a User object.
   */
  deserialize(obj) {
    return new User(obj.uid, obj.username, obj.isAdmin, obj.gameId, obj.avatar, obj.score);
  }
}

module.exports = {
  User,
}
