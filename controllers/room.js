class Room {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  joinRoom(data) {
    this.socket.to(socket.roomID).emit('newPlayer', data);
  }
}

module.exports = Room;
