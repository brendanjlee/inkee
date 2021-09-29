const admin = require("./firebase");
const invites = require('../classes/invites');

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {Object} userInfo the user object used to create game instance.
 * @param {Object} gameConfiguration the object containing game configuration.
 * @return {Promise} the promise result of the new game instance.
 */
function createGameInstance(userInfo, gameConfiguration) {
  const db = admin.database();
  const gameRef = db.ref('games');
  const newGameId = gameRef.push().key;

  const updates = {};
  updates[newGameId] = {
    admin: userInfo.uid,
    messages: [],
    settings: gameConfiguration,
    invite: invites.Invite(),
  };

  const result = gameRef.update(updates);
  addNewUser(newGameId, userInfo);
  return result;
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {Promise} the promise result of the added user.
 */
function addNewUser(gameId, userInfo) {
  const db = admin.database();
  const usersRef = db.ref(`games/${gameId}/users`);
  const newUserKey = usersRef.push().key;

  const updates = {};
  updates[newUserKey] = userInfo;
  return usersRef.update(updates);
}

/**
 * Adds provided user to the game associated with the invite code.
 * 
 * @param {string} inviteCode the invite code associated with the game.
 * @param {Object} userInfo the new user info.
 * @return {Promise} the promise result of the added user or null if unsuccessful.
 */
function inviteClicked(inviteCode, userInfo) {
  const db = admin.database();
  const gameRef = db.ref('games');
  gameRef.orderByChild('invite').equalTo(inviteCode).limitToFirst(1).on('child_added', (snapshot) => {
    console.log(snapshot.key);
    addNewUser(snapshot.key, userInfo);
  });
  return null;
}

/**
 * Updates the game configuration of the specified game.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {Promise} the promise result of the game update.
 */
function updateGameConfiguration(gameId, gameConfiguration) {
  const gameRef = admin.database().ref(`games/${gameId}/settings`);
  return gameRef.set(gameConfiguration);
}

module.exports = {
  createGameInstance,
  addNewUser,
  updateGameConfiguration,
  inviteClicked,
};
