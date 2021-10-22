// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const config = require('../config');

module.exports = admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  storageBucket: config.storageBucket,
  databaseURL: config.databaseURL,
});
