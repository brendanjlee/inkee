const { addNewUser } = require('../firebase/lobby-generation');

class Room {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Creates a new room with an invite code, sends invite code as
   * response to the request.
   * 
   * @param {object} gameConfiguration 
   * @param {object} userData 
   */
   createRoom(gameConfiguration, userData) {    
    const inviteCode = new Invite().inviteCode;
    const newUser = new User(userData.uid, userData.avatar, 0);
    this.socket.player = newUser;
    this.socket.roomID = inviteCode;

    createGameInstance(gameConfiguration, inviteCode)
      .then(() => {
        addNewUser(newUser, inviteCode)
          .then(() => {
            makeAdmin(newUser, inviteCode)
              .then(() => {
                socket.emit('inviteCode', inviteCode);
              });
          });
      });
  };

  /**
   * Adds user to room corresponding to the provided invite code.
   * 
   * @param {object} userData 
   * @param {string} inviteCode
   */
  joinRoom(userData, inviteCode) {
    this.socket.roomID = inviteCode;
    const newUser = new User(userData.uid, userData.avatar, 0);;
    this.socket.player = newUser;

    addNewUser(userData, inviteCode)
      .then(() => {
        this.socket.to(socket.roomID).emit('newPlayer', newUser);
        this.socket.emit('inviteCode', inviteCode);
      });
  }

  /**
   * Updates settings in the room.
   * 
   * @param {object} userData 
   * @param {string} inviteCode
   */
  updateSettings(data) {
    this.socket.to(socket.roomID).emit('settingsUpdate', data);
  }
}

module.exports = {
  Room,
}
