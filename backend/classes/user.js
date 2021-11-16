/** Represents a game user. */
class User {
  /**
   * Constructs a new User object.
   *
   * @param {string} uid the username of the user.
   * @param {string} avatar the URL where the user's avatar is located.
   * @param {number} score the score of the user.
   * @param {boolean} isDrawing user is drawing.
   * @param {boolean} isAdmin user is admin of game.
   */
  constructor(uid, avatar, score = 0, isDrawing = false, isAdmin = false, guessedWord = false) {
    this.uid = uid;
    this.avatar = avatar;
    this.score = score;
    this.isDrawing = isDrawing;
    this.isAdmin = isAdmin;
    this.guessedWord = guessedWord;
  }

  /**
   * Constructs a User object from deserialized JSON object.
   *
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} a User object.
   */
  deserialize(obj) {
    return new User(obj.uid, obj.avatar, obj.score, obj.isDrawing, obj.isAdmin, obj.guessedWord);
  }
}

module.exports = {
  User,
};
