/**
 * Configures and returns a new user object.
 * 
 * @param {string} uid the username of the user.
 * @param {string} username the unique ID tag associated with the user.
 * @param {boolean} isAdmin boolean denoting if the user is admin of the game.
 * @param {string} gameId the game ID that the user is associated with.
 * @param {string} avatar the URL where the user's avatar is located.
 * @return {Object} the user object formed by the parameters.
 */
function User(uid, username, isAdmin, gameId, avatar) {
  return {
    uid: uid,
    username: username,
    gameId: gameId,
    isAdmin: isAdmin,
    avatar: avatar,
    score: 0,
  };
}

module.exports = {
  User,
}
