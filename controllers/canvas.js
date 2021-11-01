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
    this.socket.broadcast.to(socket.roomId).emit('drawingEvent', data);
    // if (this.socket.player.isDrawing) {
    //   } else {
    //   this.socket.broadcast.emit('ERROR', 'Not authorized to draw!');
    // }
  }

  /**
   * Handles canvas being cleared by drawers.
   */
  clearCanvas() {
    const {socket} = this;
    this.socket.broadcast.to(socket.roomId).emit('clearCanvas');
    // if (this.socket.player.is_drawing) {
      
    // }
  }
}

module.exports = {
  Canvas,
};
