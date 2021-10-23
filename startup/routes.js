const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const gameRouter = require('../routes/game-routes');

/**
 * Validates Firebase ID Tokens of users that send requests to /v1
 * 
 * @param {Object} req the HTTP request being made to the API.
 * @param {Object} res the HTTP response associated with the API request.
 * @param {Function} next Callback argument to the middleware function,
 * called if successful validation is made.
 */
const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
      console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403);
    res.sendFile('403.html', { root: '../backend/public' });
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403);
    res.sendFile('403.html', { root: '../backend/public' });
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403);
    res.sendFile('403.html', { root: '../backend/public' });
    return;
  }
};


// TODO: WHEN DEPLOYED, SUBSTITUDE ORIGIN WITH DOMAIN OF PROJECT.
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  methods: 'GET, POST'
}

module.exports = (app) => {
  app.use(express.json());
  //app.use(validateFirebaseIdToken);
  app.use(cookieParser());
  app.use(cors(corsOptions));

  // Setup Routes
  app.use('/games', gameRouter.router);
};