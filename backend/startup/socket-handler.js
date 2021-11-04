const socketIO = require('socket.io');

const {Game} = require('../controllers/game');
const {Canvas} = require('../controllers/canvas');
const {Message} = require('../controllers/message');
const {Room} = require('../controllers/room');
const {Disconnect} = require('../controllers/disconnect');

module.exports.init = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('CONNECTION!!!!');
    // const {token} = socket.handshake.query;

    /* Socket Lifecycle Listeners */
    /* User disconnects from server */
    socket.on('disconnect', () => {
      new Disconnect(io, socket).onDisconnect();
    });

    /* Game Change Listeners */
    /* Create Game */
    socket.on('createGame', (gameCreationData) => {
      new Room(io, socket).createRoom(gameCreationData.gameConfiguration,
          gameCreationData.userData);
    });

    /* User join events */
    socket.on('joinRoom', (joinData) => {
      console.log(joinData);
      new Room(io, socket).joinRoom(joinData.userData, joinData.inviteCode);
    });

    socket.on('joinRandomRoom', (joinData) => {
      new Room(io, socket).joinRandomRoom(joinData.userData);
    });

    socket.on('getSettings', () => {
      new Room(io, socket).sendSettings();
    });

    /* Settings change event */
    socket.on('settingsUpdate', (settingData) => {
      new Room(io, socket).updateSettings(settingData.settingUpdate);
    });

    /* Canvas related events */
    /* Drawing event */
    socket.on('drawingEvent', (drawingData) => {
      console.log(drawingData);
      new Canvas(io, socket).emitDrawing(drawingData);
    });

    /* Clear canvas event */
    socket.on('clearCanvas', () => {
      new Canvas(io, socket).clearCanvas();
    });

    /* Start Drawing Handler */
    socket.on('startDrawing', (startDrawingData) => {
      new Canvas(io, socket).startDrawing(startDrawingData);
    });

    /* Finish Drawing Handler */
    socket.on('finishDrawing', () => {
      new Canvas(io, socket).finishDrawing();
    });

    /* Game logic and message events */
    /* Start timer on the running game instnace */
    socket.on('startTimer', () => {
      new Game(io, socket).startTimer();
    });

    /* User chat message event */
    socket.on('chatMessage', (messageData) => {
      new Message(io, socket).onMessage(messageData.message);
    });

    /* User start game event */
    socket.on('startGame', () => {
      new Game(io, socket).startGame();
    });

    socket.on('getPlayers', () => {
      new Room(io, socket).sendUsers();
    });
  });
};
