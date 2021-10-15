module.exports = (io) => {
  const roomData = {};

  io.on('connection', (socket) => {
    console.log('User joined through socket io.');
    let roomId = null;

    io.on('room', (data) => {
      console.log(`User joined room ${data.socketId} socket io.`);
      roomId = data.socketId;
      socket.join(roomId);
      roomData[data.socketId][socket.id].username = data.username;
    });

    io.on('disconnect', (data) => {
      console.log(`${roomData[data.socketId][socket.id].username} left.`);
      roomData[data.socketId] && roomData[data.socketId][socket.id]
        && (delete roomData[data.socketId][socket.id]);
    });
  });
};
