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
  /* istanbul ignore next */
  constructor(uid, avatar, isAdmin = false, socket = null) {
    this.uid = uid;
    this.avatar = avatar;
    this.score = 0;
    this.isAdmin = isAdmin;
    this.isDrawing = false;
    this.guessedWord = false;
    this.socket = socket;
  }
}

module.exports = {
  User,
};
