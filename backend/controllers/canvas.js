/**
 * Handles canvas logic for the game.
 */
class Canvas {
  /**
   * Constructs a new canvas handler using io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Handles propagating drawing data to all the connected socket clients.
   *
   * @param {object} data the drawing data object.
   */
  emitDrawing(data) {
    const {socket} = this;
    socket.broadcast.to(socket.roomID).emit('drawingEvent', data);
  }

  /**
   * Handles canvas being cleared by drawers.
   */
  clearCanvas() {
    const {socket} = this;
    socket.broadcast.to(socket.roomID).emit('clearCanvas');
  }
}

module.exports = {
  Canvas,
};
