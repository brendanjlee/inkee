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
  /* istanbul ignore next */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Handles propagating drawing data to all the connected socket clients.
   *
   * @param {object} drawingData the drawing data object.
   */
  /* istanbul ignore next */
  emitDrawing(drawingData) {
    const {socket} = this;
    socket.broadcast.to(socket.roomId).emit('drawingEvent', drawingData);
  }

  /**
   * Handles canvas being cleared by drawers.
   */
  /* istanbul ignore next */
  clearCanvas() {
    const {socket} = this;
    socket.broadcast.to(socket.roomId).emit('clearCanvas');
  }
}

module.exports = {
  Canvas,
};
