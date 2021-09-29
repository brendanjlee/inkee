const admin = require('./firebaseInit');
const gameInit = require('../classes/game');
const usersInit = require('../classes/users');

/**
 * Returns game_id reference from database.
 *
 * @param {string} gameId the game_id string.
 * @return {string} the path reference of the game associated with game_id.
 */
function getGameReference(gameId) {
  return admin.database().ref('games').child(gameId);
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {Object} userInfo the user ID used to create game instance.
 * @param {Object} gameConfiguration the object containing game configuration.
 * @return {string} the unique game key returned from the backend.
 */
function createGameInstance(userInfo, gameConfiguration) {
  const gameRef = admin.database().ref('games').push();
  gameRef.set({
    admin: userInfo.userId,
    messages: [],
    users: [userInfo],
    settings: gameConfiguration,
  });
  return gameRef.key;
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {string} the reference key of the new user.
 */
function addNewUser(gameId, userInfo) {
  const gameUsersRef = admin.database().ref(`games/${gameId}/users`).push();
  gameUsersRef.set(userInfo);

  return gameUsersRef.key;
}

/**
 * Updates the game configuration of the specified game.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {string} the reference key of the new user.
 */
function updateGameConfiguration(gameId, gameConfiguration) {
  const gameRef = admin.database().ref(`games/${gameId}/settings`);
  gameRef.set(gameConfiguration);
}

module.exports = {
  getGameReference,
  createGameInstance,
  addNewUser,
  updateGameConfiguration,
};
