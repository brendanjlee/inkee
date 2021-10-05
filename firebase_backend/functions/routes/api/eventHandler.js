let express = require('express');
var router = express.Router();

router.post('/games/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  res.send(`Received POST request for game ${gameId}`);
});

router.post('/games/:gameId/messages', (req, res) => {
  const gameId = req.params.gameId;
  res.send(`Received POST message request for game ${gameId}`);
});

router.post('/games/:gameId/users', (req, res) => {
  const gameId = req.params.gameId;
  res.send(`Received POST user request for game ${gameId}`);
});

router.post('/games/:gameId/settings', (req, res) => {
  const gameId = req.params.gameId;
  res.send(`Received POST setting request for game ${gameId}`);
});
