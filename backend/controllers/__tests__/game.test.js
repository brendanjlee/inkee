const { assert } = require('./assert');
const { createServer } = require('http');
const Client = require('socket.io-client');
const sockets = require('../../startup/socket-handler');
const {Game} = require('../game');

rooms = {};

describe('Disconnect Test', () => {
  let io;
  let clientSocket1;
  let clientSocket2;
  let httpServer;
  let createdInviteCode;

  beforeAll((done) => {
    httpServer = createServer();
    io = sockets.init(httpServer);

    let connected = false;
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket1 = new Client(`http://localhost:${port}`);
      clientSocket1.on('connect', () => {
        if (connected) {
          done();
        } else {
          connected = true;
        }
      });

      clientSocket2 = new Client(`http://localhost:${port}`);
      clientSocket2.on('connect', () => {
        if (connected) {
          done();
        } else {
          connected = true;
        }
      });
    });
  });

  afterAll((done) => {
    io.close();
    if (clientSocket1.connected) {
      clientSocket1.close();
    }

    if (clientSocket2.connected) {
      clientSocket2.close();
    }

    httpServer.close();
    done();
  });

  test('Create room', (done) => {
    const testUserData = {
      uid: 'admin',
      avatar: 'temp',
    };

    clientSocket1.on('inviteCode', (inviteCode) => {
      createdInviteCode = inviteCode;
      assert(inviteCode === createdInviteCode);
      assert(rooms[inviteCode].users[testUserData.uid].uid === testUserData.uid);
      assert(rooms[inviteCode].users[testUserData.uid].avatar === testUserData.avatar);
      done();
    });

    clientSocket1.emit('createGame', {
      gameConfiguration: {
        numRounds: 30,
        roundLength: 30,
        customWordsOnly: false,
        customWords: [],
      },
      userData: testUserData,
    });
  });

  test('Join room event client 2', (done) => {
    const testUserData = {
      uid: 'client1',
      avatar: 'temp',
    };

    clientSocket2.on('inviteCode', (inviteCode) => {
      assert(inviteCode === createdInviteCode);
      assert(rooms[inviteCode].users[testUserData.uid].uid === testUserData.uid);
      assert(rooms[inviteCode].users[testUserData.uid].avatar === testUserData.avatar);
      done();
    });

    clientSocket2.emit('joinRoom', {
      inviteCode: createdInviteCode,
      userData: testUserData,
    });
  });

  test('Test Start Game', (done) => {
    clientSocket1.on('startGame', () => {
      assert(rooms[createdInviteCode].inProgress);
      done();
    });

    clientSocket1.emit('startGame');
  });

  test('Test Game Timer', (done) => {
    clientSocket1.on('timer', (val) => {
      if (val === rooms[createdInviteCode].settings.roundLength - 1) {
        rooms[createdInviteCode].currentTime = 1;
        done();
      }
    });

    clientSocket1.emit('startTimer');
  });
});
