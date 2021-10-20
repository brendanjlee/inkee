const express = require('express');
const router = express.Router();

// Classes required.
const User = require('../classes/user');
const Invite = require('../classes/invite');
const GameConfiguration = require('../classes/game-configuration');
const Serializer = require('../classes/serializer');

// Database Interfacing Functions.
const functions = require('../firebase/lobby-generation');

// Initialize Serializer.
const serializer = new Serializer.Serializer([User, Invite, GameConfiguration]);

/* Create game in Firebase Realtime Database */
router.post('/', (req, res) => {
  const gameConfiguration = req.body.gameConfiguration;
  const userData = req.body.userData;
  
  const inviteCode = new Invite.Invite().inviteCode;

  functions.createGameInstance(gameConfiguration, inviteCode)
    .then(() => {
      functions.addNewUser(userData, inviteCode)
        .then(() => {
          functions.makeAdmin(userData, inviteCode);
        })
    });

  const result = inviteCode;
  res.status(200).send(JSON.stringify(result));
});

/* Add user to game in Firebase Realtime Database */
router.post('/:inviteCode/users', (req, res) => {
  console.log(req.body);
  const inviteCode = req.params.inviteCode;
  const userData = req.body.userData;

  functions.addNewUser(userData, inviteCode, res);
});

module.exports = {
  router,
}
