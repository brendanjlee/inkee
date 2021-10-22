const socket_io = require('socket.io');

const { Canvas } = require('../controllers/canvas');
const { Message } = require('../controllers/message');

module.exports.init = (server) => {
  const io = socket_io(server);

  io.on('connection', (socket) => {
    console.log("CONNECTION!!!!");
    /* Socket Lifecycle Listeners */
    /* User disconnects from server */
    socket.on('disconnect', () => {
      //new Disconnect(io, socket).onDisconnect()
      console.log("DISCONNECT");
    });

    /* Game Change Listeners */
    /* User join event */
    socket.on('joinRoom', async (data) => {
      await new Room(io, socket).joinRoom(data);
    });
    
    /* Settings change event */
    socket.on('settingsUpdate', (data) => {
      new Room(io, socket).updateSettings(data)
    });
    
    /* Canvas related events */
    /* Drawing event */
    socket.on('drawingEvent', (data) => {
      new Canvas(io, socket).emitDrawing(data)
    });
    
    /* Clear canvas event */
    socket.on('clearCanvas', () => {
      new Canvas(io, socket).clearCanvas()
    });

    /* Game logic and message events */
    /* Start timer on the running game instnace */
    socket.on('startTimer', () => {
      new Game(io, socket).startTimer();
    });

    /* User chat message event */
    socket.on('message', (data) => {
      new Message(io, socket).onMessage(data)
    });
  });
};