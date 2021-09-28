const admin = require('firebase-admin');
admin.initializeApp();

/**
 * Returns game_id reference from database.
 *
 * @param {string} gameId the game_id string.
 * @return {string} the path reference of the game associated with game_id.
 */
function getGameReference(gameId) {
  return admin.database().ref('games').child(gameId);
}

module.exports = {
  admin,
  getGameReference,
};
