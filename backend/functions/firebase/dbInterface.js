import admin from './firebase';
import invites from '../classes/invite';

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {Object} userInfo the user object used to create game instance.
 * @param {Object} gameConfiguration the object containing game configuration.
 * @return {string} the string ID of the new game instance, null if error.
 */
function createGameInstance(userInfo, gameConfiguration) {
  const db = admin.database();
  const gameRef = db.ref('games');
  const newGameId = gameRef.push().key;

  const updates = {};
  updates[newGameId] = {
    admin: userInfo.uid,
    invite: invites.Invite(),
    inProgress: false,
    messages: [],
    settings: gameConfiguration,
  };

  gameRef.update(updates)
    .then((value) => {
      console.log(`Game created successfully: ${value}`);
      addNewUser(newGameId, userInfo);
      return newGameId;
    }).catch((error) => {
      console.log(`Error creating game: ${error}`);
      return null;
    });
}

/**
 * Creates a game object in the backend and returns the game_id.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} userInfo the new user info.
 * @return {string} the user ID on success, null if error.
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
      return newUserId;
    }).catch((error) => {
      console.log(`Error adding user: ${error}`);
      return null;
    });
}

/**
 * Adds provided user to the game associated with the invite code.
 * 
 * @param {string} inviteCode the invite code associated with the game.
 * @param {Object} userInfo the new user info.
 * @return {string} string ID of user being added by invite, null if error.
 */
function handleInvite(inviteCode, userInfo) {
  const db = admin.database();
  const gameRef = db.ref('games');
  gameRef.orderByChild('invite').equalTo(inviteCode).limitToFirst(1).once('child_added')
    .then((snapshot) => {
      if (snapshot.exists()){
        return addNewUser(snapshot.key, userInfo);
      }
      throw `Error locating game using invite code ${inviteCode}`;
    })
    .catch((error) => {
      console.log(`Error occurred while finding game: ${error}`);
      return null;
    });

  return null;
}

/**
 * Updates the game configuration of the specified game.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} gameSetting the new game setting configuration.
 * @return {boolean} indicating if the game update was successful.
 */
function updateGameConfiguration(gameId, gameSetting) {
  const db = admin.database();
  const gameRef = db.ref(`games/${gameId}/settings`);
  
  const updates = {};
  updates[`${gameSetting.setting}`] = gameSetting.value;
  gameRef.update(updates)
    .then((value) => {
      console.log(`Update Successful: ${value}`);
      return true;
    })
    .catch((error) => {
      console.log(`Error Updating Game: ${error}`);
      return false;
    });
}

/**
 * Adds a new message to the game chat.
 * 
 * @param {string} gameId the gameId that has been generated.
 * @param {Object} messageInfo the new message info.
 * @return {boolean} indicating if the message was successfully posted.
 */
function postNewMessage(gameId, messageInfo) {
  // TODO: Check for profanity filter setting.
  const db = admin.database();
  const gameRef = db.ref(`games/${gameId}/messages`);
  const newMessageId = gameRef.push().key;

  const updates = {};
  updates[newMessageId] = messageInfo;
  gameRef.update(updates)
    .then((value) => {
      console.log(`Message posted successfully: ${value}`);
      return true;
    }).catch((error) => {
      console.log(`Error posting message: ${error}`);
      return false;
    });
}

module.exports = {
  createGameInstance,
  addNewUser,
  updateGameConfiguration,
  handleInvite,
  postNewMessage,
};
