class Message {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  onMessage(data) {
    this.socket.to(socket.roomID).emit('message', data);
  }
}

module.exports = Message;
