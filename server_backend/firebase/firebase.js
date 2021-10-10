// Initialize Firebase Admin SDK
const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require('../secrets/serviceAccountKey.json');
const config = require('../config');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
});

module.exports = {
  admin,
}
