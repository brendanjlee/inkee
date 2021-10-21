const socket_io = require('socket.io');

const { Canvas } = require('../controllers/canvas');

module.exports.init = (server) => {
  const io = socket_io(server);

  io.on('connection', (socket) => {
    /* User join event */
    socket.on('joinRoom', async (data) => {
      await new Room(io, socket).joinRoom(data);
    });
    
    /* Settings change event */
    socket.on('settingsUpdate', (data) => {
      new Room(io, socket).updateSettings(data)
    });
    
    /* Drawing event */
    socket.on('drawingEvent', (data) => {
      new Canvas(io, socket).emitDrawing(data)
    });
    
    /* Clear canvas event */
    socket.on('clearCanvas', () => {
      new Canvas(io, socket).clearCanvas()
    });
    
    socket.on('message', (data) => {
      new Message(io, socket).onMessage(data)
    });

    socket.on('disconnect', () => {
      new Disconnect(io, socket).onDisconnect()
    });

    socket.on('startTimer', () => {
      new Game(io, socket).startTimer();
    })
  });
};