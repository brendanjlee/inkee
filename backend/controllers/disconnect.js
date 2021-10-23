
class Disconnect {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  onDisconnect() {
    const { io, socket } = this;
    const { roomID } = socket;
    if (socket.player) {
      socket.player.id = socket.id;
      socket.to(socket.roomID).emit('disconnection', socket.player);
    }

    // Handle socket clean up.
  }
}

module.exports = {
  Disconnect,
}
