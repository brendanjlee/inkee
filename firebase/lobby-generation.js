const admin = require('../firebase/firebase-admin');

/**
 * Creates a game object in the backend and returns the game_id/invite code.
 *
 * @param {Object} gameConfiguration the object containing game configuration.
 * @param {string} inviteCode the inviteCode to create the game.
 */
async function createGameInstance(gameConfiguration, inviteCode) {
  const db = admin.database();
  const gameRef = db.ref('games');

  const updates = {};
  updates[inviteCode] = {
    inProgress: false,
    messages: [],
    settings: gameConfiguration,
  };

  await gameRef.update(updates);
}

/**
 * Sets the specified user as the admin of the specified gameId.
 *
 * @param {Object} userData the object containing user info.
 * @param {string} inviteCode the game id.
 * @return {boolean} true if update is successful.
 */
async function makeAdmin(userData, inviteCode) {
  const db = admin.database();
  const gameRef = db.ref('games');

  const updates = {};
  updates[`${inviteCode}/admin`] = userData.uid;
  await gameRef.update(updates);
}

/**
 * Creates a game object in the backend and returns the game_id.
 *
 * @param {Object} userData the new user info.
 * @param {string} inviteCode the inviteCode that has been generated.
 */
async function addNewUser(userData, inviteCode) {
  const db = admin.database();
  const usersRef = db.ref(`games/${inviteCode}/users`);

  const updates = {};
  updates[userData.uid] = userData;
  await usersRef.update(updates);
}

module.exports = {
  createGameInstance,
  addNewUser,
  makeAdmin,
};
