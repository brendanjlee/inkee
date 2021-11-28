/* global rooms */
const {Invite} = require('../classes/invite');
const {User} = require('../classes/user');
const {RoomInstance} = require('../classes/room-instance');

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
    let inviteCode;
    do {
      inviteCode = new Invite().inviteCode;
    } while (rooms[inviteCode] !== undefined);
    
    const newUser = new User(userData.uid, userData.avatar, true, this.socket);
    this.socket.player = newUser;
    this.socket.roomId = inviteCode;

    this.socket.join(inviteCode);
    this.socket.emit('inviteCode', inviteCode);
    rooms[inviteCode] = new RoomInstance(newUser, gameConfiguration.numRounds,
      gameConfiguration.roundLength, gameConfiguration.isPrivate, 
      gameConfiguration.customWords, gameConfiguration.customWordsOnly);
  }

  /**
   * Adds user to room corresponding to the provided invite code.
   *
   * @param {object} userData
   * @param {string} inviteCode
   */
  joinRoom(userData, inviteCode) {
    const newUser = new User(userData.uid, userData.avatar, false, this.socket);
    this.socket.player = newUser;

    if (rooms[inviteCode] !== undefined) {
      if (rooms[inviteCode].users[newUser.uid] === undefined) {
        this.socket.roomId = inviteCode;

        const user = Object.assign({}, newUser);
        delete user.socket;
        this.io.to(this.socket.roomId).emit('newPlayer', user);
        this.socket.join(inviteCode);
        this.socket.emit(rooms[inviteCode].inProgress ?
          'startGame' : 'inviteCode', inviteCode);
        rooms[inviteCode].users[newUser.uid] = newUser;
        return;
      }

      this.socket.emit('ERROR', 'Another player has this name already!');
      return;
    }
    this.socket.emit('ERROR', 'Room does not exist!');
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
   * Remove socket from current room.
   */
  leaveRoom() {
    const {roomId, player} = this.socket;
    this.socket.leave(roomId);
    delete rooms[roomId].users[player.uid];
  }

  /**
   * Send settings to the connected user.
   */
  sendSettings() {
    const {roomId} = this.socket;
    this.socket.emit('loadSettings', rooms[roomId].settings);
  }

  /**
   * Send players to the connected user
   */
  sendUsers() {
    const userNames = Object.keys(rooms[this.socket.roomId].users);
    const users = [];
    userNames.map((userName) => {
      // Deep copy user object (to make temporary changes)
      const user = Object.assign({}, rooms[this.socket.roomId].users[userName]);
      // Can't emit an object with a socket object (causes circular reference)
      delete user.socket;
      users.push(user);
    });

    this.socket.emit('getPlayers', users);
  }

  /**
   * Updates settings in the room.
   *
   * @param {object} data the settings data that has been updated.
   */
  updateSettings(data) {
    if (this.socket.player.isAdmin) {
      this.io.to(this.socket.roomId).emit('settingsUpdate', data);
      return;
    }

    this.socket.emit('ERROR', 'Not authorized to update settings!');
  }
}

module.exports = {
  Room,
};
