// Dependencies
require('./firebase/dbWorker');

const functions = require('firebase-functions');
const cookieParser = require('cookie-parser')();
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const validateFirebaseIdToken = async (req, res, next) => {
  functions.logger.log('Check if request is authorized with Firebase ID token');
  
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    functions.logger.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403);
    res.sendFile('403.html', { root: '../public/' });
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    functions.logger.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    functions.logger.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403);
    res.sendFile('403.html', { root: '../public/' });
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    functions.logger.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    functions.logger.error('Error while verifying Firebase ID token:', error);
    res.status(403);
    res.sendFile('403.html', { root: '../public/' });
    return;
  }
};

router.use(cors({origin: true}));
app.use(cookieParser);
app.use(validateFirebaseIdToken);

// Set up API endpoint.
app.get('/', (req, res) => {
  const answer = JSON.stringify('Hello from Inkee Backend.');
  res.send(answer);
});

exports.inkeeApi = functions.https.onRequest(app);
