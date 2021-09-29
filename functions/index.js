// Dependencies
require('./firebase/firebase');

const functions = require('firebase-functions');
// const cookieParser = require('cookie-parser')();
const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();

router.use(cors({origin: true}));
// app.use(cookieParser);
// app.use(validateFirebaseIdToken);

const dbWrapper = require('./firebase/dbInterface');
const user = require('./classes/users');
const game = require('./classes/gameSettings');
const userInfo = user.User('Neel', 'SOMETHING', false, 'TEST', 'test');

const gameConfiguration = game.GameSettings();
const gameInstance = dbWrapper.createGameInstance(userInfo, gameConfiguration);

// Set up API endpoint.
app.get('/', (req, res) => {
  const answer = JSON.stringify('Hello from Inkee Backend.');
  res.send(answer);
});

exports.inkeeApi = functions.https.onRequest(app);
