const admin = require('./firebase');

/**
 * Creates a game object in the backend and returns the game_id/invite code.
 * 
 * @param {Object} gameConfiguration the object containing game configuration.
 * @return {string} the game ID of the new game instance, throws error if error occurs.
 */
async function createGameInstance(gameConfiguration, inviteCode) {
  const db = admin.database();
  const gameRef = db.ref('games');

  const updates = {};
  updates[inviteCode] = {
    inProgress: false,
    admin: 'temp',
    messages: [],
    settings: gameConfiguration
  };

  await gameRef.update(updates);
}

/**
 * Sets the specified user as the admin of the specified gameId.
 * 
 * @param {Object} userInfo the object containing user info.
 * @param {string} gameId the game id.
 * @return {boolean} true if update is successful.
 */
async function makeAdmin(userInfo, gameId) {
  const db = admin.database();
  const gameRef = db.ref(`games/${gameId}`);

  const updates = {};
  updates['admin'] = userInfo.uid;

  await gameRef.update(updates);
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {Array} the gameId and userId, throws error if error occurs.
 */
async function addNewUser(gameId, userInfo) {
  const db = admin.database();
  const usersRef = db.ref(`games/${gameId}/users`);

  const updates = {};
  updates[userInfo.uid] = userInfo;

  await usersRef.update(updates);
}

/**
 * Adds provided user to the game associated with the invite code.
 * 
 * @param {string} inviteCode the invite code associated with the game.
 * @param {Object} userInfo the new user info.
 * @return {Array} game ID and userId, throws error if error occurs.
 */
async function handleInvite(inviteCode, userInfo) {
  const db = admin.database();
  const gameRef = db.ref('games');
  
  const snapshot = await get(child(gameRef, inviteCode));
  if (snapshot.exists()){
    const userId = addNewUser(snapshot.key, userInfo);
    return [snapshot.key, userId]
  }
}

/**
 * Updates the provided user and param with the new value.
 * 
 * @param {string} userId the user id of the user being updated.
 * @param {string} param the name of the field being updates
 * @param {Object} newValue the new value of the user param.
 * @return {boolean} if success, throws error if error occurs
 */
async function updateUser(userId, param, newValue) {
  const db = admin.database();
  const gameRef = db.ref('games/users');

  const snapshot = get(child(gameRef, userId));
  if (snapshot.exists()){
    const updates = {};
    updates[`${userId}/${param}`] = newValue;

    await gameRef.update(updates);
  }
}

module.exports = {
  createGameInstance,
  addNewUser,
  handleInvite,
  makeAdmin,
  updateUser,
};
