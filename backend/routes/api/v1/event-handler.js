const express = require('express');
const router = express.Router();

// Classes required.
const User = require('../../../classes/user');
const Invite = require('../../../classes/invite');
const GameConfiguration = require('../../../classes/gameConfiguration');
const Serializer = require('../../../classes/serializer');

// Database Interfacing Functions.
const functions = require('../../../firebase/db-interface');

// Initialize Serializer.
const serializer = new Serializer([User, Invite, GameConfiguration]);

/* Create game in Firebase Realtime Database */
router.post('/games', (req, res) => {
  const gameConfiguration = serializer.deserialize(req.body.gameConfiguration);
  const userData = serializer.deserialize(req.body.userData);
  
  let gameId = null;
  try {
    gameId = functions.createGame(gameConfiguration);
  } catch (error) {
    console.log(error);
  }

  if (gameId === null) {
    res.status(500).send("Error creating game.");
    return;
  }

  let userId = null;
  try {
    userId = functions.addNewUser(gameId, userData);
  } catch (error) {
    console.log(error);
  }

  if (userId === null) {
    res.status(500).send("Error adding user to the created game.");
    return;
  } 

  let userAdmin = null;
  try {
    userAdmin = functions.makeAdmin(userId, gameId);
  } catch (error) {
    console.log(error);
  }

  if (userAdmin === null) {
    res.status(500).send("Error making user admin of the created game.");
    return;
  }

  const result = [gameId, userId];
  res.status(200).send(JSON.stringify(result));
});

/* Add user to game in Firebase Realtime Database */
router.post('/games/:gameId/users', (req, res) => {
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
