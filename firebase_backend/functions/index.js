// Dependencies
require('./firebase/firebase');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const api = require('./routes/api');

router.use(cors({origin: true}));
router.use('/api', api);

// Set up API endpoint.
router.get('/', (req, res) => {
  const answer = JSON.stringify('Hello from Inkee Backend.');
  res.send(answer);
});

exports.inkeeApi = functions.https.onRequest(app);
