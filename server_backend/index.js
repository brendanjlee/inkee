const express = require('express');
const io = require('socket.io');
const cors = require('cors');


// App Initialization
const port = process.env.PORT || 3000;
const app = express();
const server = app.listen(port, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
app.use(cors);

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection");
});

