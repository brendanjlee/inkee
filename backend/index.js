// Initalize express and application routes.
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/firebase-stream');

// Set up server for Socket IO.
const server = require('http').createServer(app);
const sockets = require('./startup/socket-handler');

// App Initialization.
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}...`));
sockets.init(server);
