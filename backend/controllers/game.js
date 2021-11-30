/* global rooms */
const words = require('../words.json');

/**
 * Handles game logic for the game.
 */
class Game {
  /**
   * Constructs the Game object using the io and socket objects.
   *
   * @param {object} io The io object used to initialize socket io.
   * @param {object} socket the socket object that triggered the game logic.
   */
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  /**
   * Starts the game and notifies connected clients.
   */
  startGame() {
    rooms[this.socket.roomId].inProgress = true;
    this.io.to(this.socket.roomId).emit('startGame');
    this.prepareRound();
  }

  /**
   * Prepares the round by asking drawing team what word to use.
   */
  prepareRound() {
    this.selectDrawingTeam();
    const wordChoices = this.randomlySelectWordChoices();
    const primaryDrawer = rooms[this.socket.roomId].roundData.primaryDrawer;
    let secondaryDrawer = undefined;
    if (rooms[this.socket.roomId].roundData.secondaryDrawer) {
      secondaryDrawer = rooms[this.socket.roomId].roundData.secondaryDrawer;
    }

    const users = rooms[this.socket.roomId].users;
    const userIds = Object.keys(users);

    let message = `<b>${users[userIds[primaryDrawer]].uid}<b>`
    if (secondaryDrawer) {
      message += ` and <b>${users[userIds[secondaryDrawer]].uid}<b> are drawing!`;
    } else {
      message += ' is drawing!';
    }

    this.io.to(this.socket.roomId).emit('drawingTeam', message);
    rooms[this.socket.roomId].roundData.wordChoices = wordChoices;
    users[userIds[primaryDrawer]].socket.emit('chooseWord', wordChoices);
    this.startTimer(10, false);
  }

  /**
   * Select random word.
   */
  selectWord(word) {
    rooms[this.socket.roomId].roundData.currentWord = word;
    // TODO: Emit the appropriate data to drawers/guessers.
  }

  /**
   * Starts the round and notifies connected clients.
   */
  startRound() {
    const {roomId} = this.socket;
    this.io.to(roomId).emit('startRound');
    this.startTimer(rooms[this.socket.roomId].roundLength, true);
    rooms[this.socket.roomId].roundData.roundInProgress = true;
  }

  /**
   * Start room session timer.
   * 
   * @param {int} length length of the timer
   * @param {boolean} isRoundTimer true if the timer applies to round.
   */
  startTimer(length, isRoundTimer = false) {
    rooms[this.socket.roomId].roundData.currentTime = length;
    this.io.to(this.socket.roomId).emit('timer',
      rooms[this.socket.roomId].roundData.currentTime);

    const interval = setInterval(() => {
      rooms[this.socket.roomId].roundData.currentTime--;
      this.io.to(this.socket.roomId).emit('timer',
        rooms[this.socket.roomId].roundData.currentTime);
      
      if (isRoundTimer && rooms[this.socket.roomId].roundData.currentTime - 1 % 15 === 0) {
        // TODO: SEND HINT.
      }
      
      if (isRoundTimer && rooms[this.socket.roomId].roundData.currentTime === 0) {
        this.io.to(this.socket.roomId).emit('endRound');
        rooms[this.socket.roomId].roundData.roundInProgress = false;
      }

      if (!isRoundTimer && rooms[this.socket.roomId].roundData.currentTime === 0) {
        const wordIdx = Math.trunc(Math.random() * 3);
        this.selectWord(rooms[this.socket.roomId].roundData.wordChoices[wordIdx]);
      }
      
      if (rooms[this.socket.roomId].roundData.currentTime === 0) {
        rooms[this.socket.roomId].roundData.currentTimer = 0;
        clearInterval(interval);
      }
    }, 1000);
    rooms[this.socket.roomId].roundData.currentTimer = interval;
  }

  /**
   * Randomly select game word choices for the round.
   * 
   * @return {string} game word.
   */
  randomlySelectWordChoices() {
    let allWords = [];
    if (rooms[this.socket.roomId].settings.customWordsOnly) {
      allWords = rooms[this.socket.roomId].settings.customWords;
    } else {
      allWords = words.english;
      
      if (rooms[this.socket.roomId].settings.customWords.length > 0) {
        allWords = allWords.concat(rooms[this.socket.roomId].settings.customWords);
      }
    }

    const usedWords = rooms[this.socket.roomId].wordsUsed;
    allWords = allWords.filter(word1 => !usedWords.find(word2 => word1 === word2));

    const wordChoices = [];
    if (allWords.length <= 3) {
      wordChoices = wordChoices.concat(allWords);
    }

    for (let idx = wordChoices.length; idx < 3; idx++) {
      // Not enough words left, restart function.
      if (allWords.length === 0) {
        rooms[this.socket.roomId].wordsUsed = [];
        return this.randomlySelectWordChoices();
      }

      const wordIdx = Math.trunc(Math.random() * allWords.length);
      wordChoices.push(allWords[wordIdx]);
      allWords.splice(wordIdx, 1);
    }

    return wordChoices;
  }

  /**
   * Select the drawing team.
   */
  selectDrawingTeam() {
    const players = rooms[this.socket.roomId].users;
    const numPlayers = Object.keys(players).length
    
    const primaryDrawerIdx = rooms[this.socket.roomId].roundData.primaryDrawer;
    let secondaryDrawerIdx = undefined;
    if (numPlayers > 2) {
      do {
        secondaryDrawerIdx = Math.trunc(Math.random() * numPlayers);
      } while (primaryDrawerIdx !== secondaryDrawerIdx);
    }

    rooms[this.socket.roomId].roundData.secondaryDrawer = secondaryDrawerIdx;
  }
}

module.exports = {
  Game,
};
