const databaseURL = 'wss://splat-io-default-rtdb.firebaseio.com/';
const storageBucket = 'splat-io.appspot.com';
/* eslint-disable-next-line */
const adminPassword = process.env.PASSWORD ||
  '$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS';

module.exports = {
  databaseURL,
  storageBucket,
  adminPassword,
};
