const admin = require('../firebase/firebase-admin');

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
    messages: [],
    settings: gameConfiguration
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

  const gameRefId = gameRef.orderByKey().equalTo(inviteCode);
  gameRefId.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const updates = {};
      updates[`${inviteCode}/admin`] = userData.uid;
      gameRef.update(updates);
    } 
  });
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {Object} userData the new user info.
 * @param {string} inviteCode the inviteCode that has been generated.
 * @param {Object} res the response object that sends the status of request.
 * @return {boolean} false if user cannot.
 */
async function addNewUser(userData, inviteCode, res = null) {
  const db = admin.database();
  const usersRef = db.ref(`games/${inviteCode}/users`);
  const usersRefId = usersRef.orderByKey().equalTo(userData.uid);

  usersRefId.once('value', (snapshot) => {
    if (!snapshot.exists()) {
      const updates = {};
      updates[userData.uid] = userData;
      usersRef.update(updates);
      
      if (res !== null) {
        res.status(200).send(`${userData.uid} added successfully.`);
      }
    } else if (res !== null) {
      res.status(400).send(`${userData.uid} already exists!`);
    }
  });
}

module.exports = {
  createGameInstance,
  addNewUser,
  makeAdmin,
};
