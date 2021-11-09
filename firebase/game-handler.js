const admin = require('firebase-admin');

/**
 * Uploads the provided message to the firebase.
 *
 * @param {string} userId the user id of the message author.
 * @param {string} inviteCode the room code that the message has been sent to.
 * @param {string} message the message content.
 */
async function writeMessage(userId, inviteCode, message) {
  const db = admin.database();
  const messageRef = db.ref(`games/${inviteCode}/messages`);
  const newMessageId = messageRef.push().key;

  const updates = {};
  updates[newMessageId] = {
    user: userId,
    message: message,
    time: new Date().getTime(),
  };

  await messageRef.update(updates);
};

/**
 * Uploads the settng update to the firebase.
 *
 * @param {string} inviteCode the room code where the setting has been updated.
 * @param {string} setting the setting that has been changed.
 * @param {string} settingValue the new value of the setting.
 */
async function updateSettings(inviteCode, setting, settingValue) {
  const db = admin.database();
  const settingsRef = db.ref(`games/${inviteCode}/settings`);

  const updates = {};
  updates[setting] = settingValue;

  await settingsRef.update(updates);
};

/**
 * Uploads the settng update to the firebase.
 *
 * @param {string} inviteCode the room code where the setting has been updated.
 * @param {boolean} inProgress denotes if the game is in progress or not.
 */
async function updateGameStatus(inviteCode, inProgress) {
  const db = admin.database();
  const progressRef = db.ref(`games/${inviteCode}`);

  const updates = {};
  updates['in_progress'] = inProgress;

  await progressRef.update(updates);
};

/**
 * Removes the player from the firebase game.
 *
 * @param {string} inviteCode the room code where the user is being removed.
 * @param {object} userData the user object that is being removed.
 */
async function removePlayerFromGame(inviteCode, userData) {
  const db = admin.database();
  const gameRef = db.ref(`games/${inviteCode}`);

  gameRef.child('users').on('value', async (snapshot) => {
    if (snapshot.numChildren() === 1) {
      await db.ref(`games/${inviteCode}`).remove();
    } else {
      await db.ref(`games/${inviteCode}/users/${userData.uid}`).remove();
    }
  });
}

module.exports = {
  writeMessage,
  updateSettings,
  updateGameStatus,
  removePlayerFromGame,
};
