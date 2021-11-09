/* eslint-disable no-undef */
// Initalize express and application routes.
const express = require('express');
const path = require('path');
const app = express();
require('./startup/routes')(app);
// require('./startup/firebase-stream');

// Set up server for Socket IO.
const server = require('http').createServer(app);
const sockets = require('./startup/socket-handler');

rooms = {};

app.get('*', (req, res, next) => {
  if(req.headers['x-forwarded-proto'] != 'https' && req.hostname !== 'localhost') {
    res.redirect('https://' + req.hostname);
  } else {
    next();
  }
});

// App Initialization.
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/:gameId', (req, res) => {
  res.redirect('/?gameId=' + req.params.gameId);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}...`));
sockets.init(server);
