const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let test = []

io.on('connection', (socket) => {
  socket.on('room', function(room) {
    socket.join(room);
  });

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    test.push(msg);
    console.log(test);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
