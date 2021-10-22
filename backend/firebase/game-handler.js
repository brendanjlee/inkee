const admin = require('firebase-admin');

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

async function updateSettings(inviteCode, setting, settingValue) {
  const db = admin.database();
  const settingsRef = db.ref(`games/${inviteCode}/settings`);

  const updates = {};
  updates[setting] = settingValue;

  await settingsRef.update(updates);
};

async function updateGameStatus(inviteCode, inProgress) {
  const db = admin.database();
  const progressRef = db.ref(`games/${inviteCode}`);

  const updates = {};
  updates["in_progress"] = inProgress;

  await progressRef.update(updates);
};

module.exports = {
  writeMessage,
  updateSettings,
  updateGameStatus,
}
