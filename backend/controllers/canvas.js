class Canvas {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  emitDrawing(data) {
    const { socket } = this;
    socket.broadcast.to(socket.roomID).emit('drawingEvent', data);
  }

  clearCanvas() {
    const { socket } = this;
    socket.broadcast.to(socket.roomID).emit('clearCanvas');
  }
}

module.exports = Canvas;
