/* global rooms */
const {Invite} = require('../classes/invite');
const {User} = require('../classes/user');
const {RoomInstance} = require('../classes/room-instance');
const {prepareUser} = require('./helpers');

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
  /* istanbul ignore next */
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

    console.log(gameConfiguration);
    let customWordsOnly = gameConfiguration.customWordsOnly;
    let customWords = gameConfiguration.customWords;
    if (customWords.length < 10 && customWordsOnly) {
      customWordsOnly = false;
    }

    rooms[inviteCode] = new RoomInstance(newUser, gameConfiguration.numRounds,
      gameConfiguration.roundLength, gameConfiguration.isPrivate, 
      customWords, customWordsOnly);
  }

  /**
   * Adds user to room corresponding to the provided invite code.
   *
   * @param {object} userData
   * @param {string} inviteCode
   */
  /* istanbul ignore next */
  joinRoom(userData, inviteCode) {
    const newUser = new User(userData.uid, userData.avatar, false, this.socket);
    this.socket.player = newUser;

    if (rooms[inviteCode] !== undefined) {
      if (rooms[inviteCode].users[newUser.uid] === undefined) {
        this.socket.roomId = inviteCode;
        this.io.to(this.socket.roomId).emit('newPlayer', prepareUser(newUser));
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
  /* istanbul ignore next */
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
  /* istanbul ignore next */
  leaveRoom() {
    if (!rooms[this.socket.roomId]) {
      return;
    }
    const {roomId, player} = this.socket;
    this.socket.leave(roomId);
    delete rooms[roomId].users[player.uid];
  }

  /**
   * Send players to the connected user
   */
  /* istanbul ignore next */
  sendUsers() {
    if (!rooms[this.socket.roomId]) {
      return;
    }
    const userNames = Object.keys(rooms[this.socket.roomId].users);
    const users = [];
    userNames.map((userName) => {
      users.push(prepareUser(rooms[this.socket.roomId].users[userName]));
    });

    this.socket.emit('getPlayers', users);
  }

  /**
   * Disconnect provided user from game.
   */
  /* istanbul ignore next */
  disconnectUser(userId) {
    if (!rooms[this.socket.roomId]) {
      return;
    }
    this.io.to(this.socket.roomId).emit('disconnection', userId);
    rooms[this.socket.roomId].users[userId].socket.emit('disconnectPlayer');
    delete rooms[this.socket.roomId].users[userId];
  }
}

module.exports = {
  Room,
};
