const { createGameInstance, addNewUser, makeAdmin } = require('../firebase/lobby-generation');

class Game {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }
};

module.exports = {
  Game,
}
