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
   */
  constructor(uid, username, isAdmin, gameId, avatar) {
    this.uid = uid;
    this.username = username;
    this.gameId = gameId;
    this.isAdmin = isAdmin;
    this.avatar = avatar;
    this.score = 0;
  }
}

export default {
  User,
}
