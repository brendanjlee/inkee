// Initialize Firebase Admin SDK
const path = require('path');
const admin = require('firebase-admin');
const config = require('../config');

const serviceAccount = path.resolve(__dirname, 'secrets/serviceAccountKey.json');

module.exports = admin.initializeApp({
  credential: admin.credential.cert(process.env.GCP_SA_KEY || serviceAccount),
  storageBucket: process.env.GCP_STORAGE_BUCKET || config.storageBucket,
  databaseURL: process.env.GCP_DATABASE_URL || config.databaseURL,
});
