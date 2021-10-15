const express = require('express');
const router = express.Router();

// Classes required.
const User = require('../classes/user');
const Invite = require('../classes/invite');
const GameConfiguration = require('../classes/game-configuration');
const Serializer = require('../classes/serializer');

// Database Interfacing Functions.
const functions = require('../firebase/db-interface');

// Initialize Serializer.
const serializer = new Serializer.Serializer([User, Invite, GameConfiguration]);

/* Create game in Firebase Realtime Database */
router.post('/', (req, res) => {
  console.log(req.body);
  const gameConfiguration = req.body.gameConfiguration;
  const userData = req.body.userData;
  
  const inviteCode = new Invite.Invite().inviteCode;
  try {
    functions.createGameInstance(gameConfiguration, inviteCode);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating game.");
    return;
  }

  // let userId = null;
  // try {
  //   userId = functions.addNewUser(inviteCode, userData);
  // } catch (error) {
  //   console.log(error);
  //   return;
  // }

  // if (userId === null) {
  //   res.status(500).send("Error adding user to the created game.");
  //   return;
  // } 

  // let userAdmin = null;
  // try {
  //   userAdmin = functions.makeAdmin(userId, inviteCode);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send(`Error making user ${userId} admin of game ${inviteCode}.`);
  //   return;
  // }

  // if (userAdmin === null) {
  //   res.status(500).send("Error making user admin of the created game.");
  //   return;
  // }

  const result = inviteCode;
  res.status(200).send(JSON.stringify(result));
});

/* Add user to game in Firebase Realtime Database */
router.post('/:gameId/users', (req, res) => {
  const gameId = req.params.gameId;
  const newUser = serializer.deserialize(req.body);
  let result = null;

  try {
    result = functions.addNewUser(gameId, newUser)
  } catch (error) {
    console.log(error);
  }

  switch (result) {
    case null:
      res.status(500).send("Error adding user to the game.");
    default:
      res.status(200).send(JSON.stringify([gameId, result]));
  }
});

module.exports = {
  router,
}
