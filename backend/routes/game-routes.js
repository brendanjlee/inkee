const express = require('express');
const router = express.Router();

// Classes required.
const { User } = require('../classes/user');
const { Invite } = require('../classes/invite');

// Database Interfacing Functions.
const functions = require('../firebase/lobby-generation');

/* Create game in Firebase Realtime Database */
router.post('/', (req, res) => {
  console.log(req.body);
  const gameConfiguration = req.body.gameConfiguration;
  const reqUserData = req.body.userData;
  
  const inviteCode = new Invite().inviteCode;
  const userData = new User(reqUserData.uid, reqUserData.avatar, 0);

  functions.createGameInstance(gameConfiguration, inviteCode)
    .then(() => {
      functions.addNewUser(userData, inviteCode)
        .then(() => {
          functions.makeAdmin(userData, inviteCode);
        });
    });
});

/* Add user to game in Firebase Realtime Database */
router.post('/:inviteCode/users', (req, res) => {
  console.log(req.body);
  const inviteCode = req.params.inviteCode;
  const reqUserData = req.body.userData;
  const userData = new User(reqUserData.uid, reqUserData.avatar, 0);

  functions.addNewUser(userData, inviteCode, res);
});

module.exports = {
  router,
}
