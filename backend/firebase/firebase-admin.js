// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const config = require('../config');

module.exports = admin.initializeApp({
  credential: admin.credential.cert(process.env.GCP_SA_KEY ||
    config.serviceAccount),
  storageBucket: process.env.GCP_STORAGE_BUCKET || config.storageBucket,
  databaseURL: process.env.GCP_DATABASE_URL || config.databaseURL,
});
