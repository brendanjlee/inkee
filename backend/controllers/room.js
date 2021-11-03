// eslint-disable-next-line
const {addNewUser, createGameInstance, makeAdmin} = require('../firebase/lobby-generation');
const {Invite} = require('../classes/invite');
const {User} = require('../classes/user');

/**
 * Handles game room creation/handling.
 */
class Room {
  /**
   * Constructs a new Room handler using the io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
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
    const newUser = new User(userData.uid, userData.avatar, 0, false, false);
    this.socket.player = newUser;
    this.socket.roomId = inviteCode;

    createGameInstance(gameConfiguration, inviteCode)
        .then(() => {
          addNewUser(newUser, inviteCode)
              .then(() => {
                makeAdmin(newUser, inviteCode)
                    .then(() => {
                      this.socket.join(inviteCode);
                      this.socket.emit('inviteCode', inviteCode);
                      rooms[inviteCode] = {
                        in_progress: false,
                        users: {},
                      };
                      rooms[inviteCode].users[newUser.uid] = newUser;
                      console.log(rooms[inviteCode]);
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
    const newUser = new User(userData.uid, userData.avatar, 0, false, false);
    this.socket.player = newUser;

    if (rooms[inviteCode] !== undefined) {
      console.log(rooms[inviteCode].users[newUser.uid]);
      if (rooms[inviteCode].users[newUser.uid] === undefined) {
        addNewUser(userData, inviteCode)
            .then(() => {
              this.socket.roomId = inviteCode;
              this.io.to(this.socket.roomId).emit('newPlayer',
                  newUser);
              this.socket.join(inviteCode);
              this.socket.emit('inviteCode', inviteCode);
              rooms[inviteCode].users[newUser.uid] = newUser;
            });
      } else {
        this.socket.emit('ERROR', 'Another player has this name already!');
      }
    } else {
      this.socket.emit('ERROR', 'Room does not exist!');
    }
  }

  /**
   * Adds user to random room.
   *
   * @param {object} userData
   */
  joinRandomRoom(userData) {
    const gameCodes = Object.keys(rooms);
    if (gameCodes.length === 0) {
      this.socket.emit('ERROR', 'There are no ongoing games right now, ' +
        'try creating one!');
      return;
    }

    const randIdx = Math.trunc(Math.random() * gameCodes.length);
    this.joinRoom(userData, gameCodes[randIdx]);
  }

  /**
   * Send settings to the connected user.
   *
   */
  sendSettings() {

  }

  /**
   * Updates settings in the room.
   *
   * @param {object} data the settings data that has been updated.
   */
  updateSettings(data) {
    if (this.socket.player.isAdmin) {
      this.io.to(this.socket.roomId).emit('settingsUpdate', data);
    } else {
      this.socket.emit('ERROR', 'Not authorized to update settings!');
    }
  }
}

module.exports = {
  Room,
};
