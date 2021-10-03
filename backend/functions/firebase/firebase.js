// Initialize Firebase Admin SDK
import admin from 'firebase-admin';
import functions from 'firebase-functions';

module.exports = admin.initializeApp(functions.config().firebase);
