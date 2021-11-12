const { assert } = require('./assert');
const { createServer } = require('http');
const Client = require('socket.io-client');
const sockets = require('../../startup/socket-handler');
const { Disconnect } = require('../disconnect');

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
      },
      userData: testUserData,
    });
  });

  test('Join room', (done) => {
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

  test('Disconnect non-admin from game', (done) => {
    clientSocket1.on('disconnection', (playerId) => {
      assert(playerId === 'client1');
      assert(!rooms[createdInviteCode].users[playerId]);
      done();
    });

    if (clientSocket2.connected) {
      clientSocket2.close();
    }
  });

  test('Disconnect admin from game', (done) => {
    clientSocket1.close();
    done();
  });
});
