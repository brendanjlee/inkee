const express = require('express');
const router = express.Router();

// Classes required.
const User = require('../../../classes/user');
const Invite = require('../../../classes/invite');
const GameConfiguration = require('../../../classes/gameConfiguration');
const Serializer = require('../../../classes/serializer');

// Database Interfacing Functions.
const functions = require('../../../firebase/dbInterface');

// Serializer Class.
const serializer = new Serializer([User, Invite, GameConfiguration]);

router.post('/games/creategame', (req, res) => {
  const gameConfiguration = serializer.deserialize(req.body.gameConfiguration);
  const userData = serializer.deserialize(req.body.userData);
  
  const gameId = functions.createGame(gameConfiguration);
  if (gameId === null) {
    res.status(500).send("Error creating game.");
    return;
  }

  const userId = functions.addNewUser(gameId, userData);
  if (userId === null) {
    res.status(500).send("Error adding user to the created game.");
    return;
  } 

  const userAdmin = functions.makeAdmin(userId, gameId);
  if (userId === null) {
    res.status(500).send("Error making user admin of the created game.");
    return;
  }

  res.status(200).send(`Successfully created game ${gameId} with admin ${userId}!`);
});

router.post('/games/:gameId/adduser', (req, res) => {
  const gameId = req.params.gameId;
  const newUser = serializer.deserialize(req.body);
  const result = functions.addNewUser(gameId, newUser);

  switch (result) {
    case null:
      res.status(500).send("Error adding user to the game.");
    default:
      res.status(200).send('Success!');
  }
});

router.post('/games/adduser/:invite', (req, res) => {
  const invite = req.params.invite;
  const newUser = serializer.deserialize(req.body);
  const result = res.send(functions.handleInvite(invite, newUser));

  switch (result) {
    case null:
      res.status(500).send(`Error adding user using invite code ${invite}.`);
    default:
      res.status(200).send('Success!');
  }
});
