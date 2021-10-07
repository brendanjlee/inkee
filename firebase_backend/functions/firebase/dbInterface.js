const admin = require('./firebase');
const Invite = require('../classes/invite');

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {Object} gameConfiguration the object containing game configuration.
 * @return {string} the game ID of the new game instance, throws error if error occurs.
 */
function createGameInstance(gameConfiguration) {
  const db = admin.database();
  const gameRef = db.ref('games');
  const newGameId = gameRef.push().key;

  const updates = {};
  updates[newGameId] = {
    invite: new Invite().inviteCode,
    inProgress: false,
    messages: [],
    settings: gameConfiguration,
  };

  gameRef.update(updates)
    .then((value) => {
      console.log(`Game created successfully: ${value}`);
      return newGameId;
    }).catch((error) => {
      console.log(`Error creating game: ${error}`);
      throw `Error creating game: ${error}`;
    });
}

function makeAdmin(userInfo, gameId) {
  const db = admin.database();
  const gameRef = db.ref('games');
  
  updates[gameId] = {
    admin: userInfo.uid,
  }

  gameRef.update(updates)
    .then((value) => {
      console.log(`User ${userInfo.uid} added as admin successfully to game ${gameId}: ${value}`);
      return true;
    }).catch((error) => {
      console.log(`Error adding user ${userInfo.uid} as admin to game ${gameId}: ${error}`);
      throw `Error adding user ${userInfo.uid} as admin to game ${gameId}: ${error}`;
    });
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {Array} the gameId and userId, throws error if error occurs.
 */
function addNewUser(gameId, userInfo) {
  const db = admin.database();
  const usersRef = db.ref(`games/${gameId}/users`);
  const newUserId = usersRef.push().key;

  const updates = {};
  updates[newUserId] = userInfo;
  usersRef.update(updates)
    .then((value) => {
      console.log(`User added successfully: ${value}`);
      return [gameId, newUserId];
    }).catch((error) => {
      console.log(`Error adding user: ${error}`);
      throw `Error adding user: ${error}`;
    });
}

/**
 * Adds provided user to the game associated with the invite code.
 * 
 * @param {string} inviteCode the invite code associated with the game.
 * @param {Object} userInfo the new user info.
 * @return {Array} game ID and userId, throws error if error occurs.
 */
function handleInvite(inviteCode, userInfo) {
  const db = admin.database();
  const gameRef = db.ref('games');
  gameRef.orderByChild('invite').equalTo(inviteCode).limitToFirst(1).once('child_added')
    .then((snapshot) => {
      if (snapshot.exists()){
        const userId = addNewUser(snapshot.key, userInfo);
        return [snapshot.key, userId]
      }
      throw `Error locating game using invite code ${inviteCode}`;
    })
    .catch((error) => {
      console.log(`Error occurred while finding game: ${error}`);
      throw `Error occurred while finding game: ${error}`
    });

  throw `Error occurred while finding game: ${error}`
}

module.exports = {
  createGameInstance,
  addNewUser,
  handleInvite,
  makeAdmin,
};
