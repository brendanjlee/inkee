/* eslint-disable no-undef */
// Initalize express and application routes.
const express = require('express');
const path = require('path');
const app = express();

// Set up server for Socket IO.
const server = require('http').createServer(app);
const sockets = require('./startup/socket-handler');
const port = process.env.PORT || 8080;

rooms = {};

app.get('/', (req, res, next) => {
  let protocol = req.headers['x-forwarded-proto'];
  let hostname = req.hostname;
  let originalUrl = req.originalUrl;
  let urlModified = false;

  if (hostname === 'localhost') {
    next();
    return;
  }
  
  if (hostname === 'inkee-io.herokuapp.com') {
    hostname = 'inkee.io';
    urlModified = true;
  }

  if (protocol !== 'https') {
    protocol = 'https';
    urlModified = true;
  }
  protocol += '://';

  if (urlModified) {
    res.redirect(301, protocol + hostname + originalUrl);
  }
  next();
});

app.get('/:gameId', (req, res) => {
  if(rooms[req.params.gameId] === undefined) {
    res.redirect('/');
  } else {
    res.redirect('/?gameId=' + req.params.gameId);
  }
});

// App Initialization.
app.use(express.static(path.join(__dirname, "build")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  next();
});

const io = sockets.init(server);
const config = require('./config');
const {instrument} = require('@socket.io/admin-ui');
instrument(io, {
  auth: {
    type: 'basic',
    username: 'admin',
    password: config.adminPassword,
  },
  namespaceName: '/admin',
});

server.listen(port, () => console.log(`Listening on Port ${port}...`));
