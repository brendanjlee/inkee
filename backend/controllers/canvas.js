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

  /**
   * Handles propagating the undo action to all the game users.
   */
  /* istanbul ignore next */
  emitUndo() {
    const {socket} = this;
    socket.broadcast.to(socket.roomId).emit('undo');
  }

  /**
   * Handles propagating the redo action to all the game users.
   */
  /* istanbul ignore next */
  emitRedo() {
    const {socket} = this;
    socket.broadcast.to(socket.roomId).emit('redo');
  }

  /**
   * Saves user's canvas state.
   */
  /* istanbul ignore next */
  emitSaveCanvasState() {
    const {socket} = this;
    socket.broadcast.to(socket.roomId).emit('saveCanvasState');
  }
}

module.exports = {
  Canvas,
};
