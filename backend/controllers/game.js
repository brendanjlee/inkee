/* global rooms */
const { Round } = require('../classes/round');
const words = require('../words.json');
const {sendUserMessage, getHints} = require('./helpers');

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

    users[userIds[primaryDrawer]].isDrawing = true;

    let message = `${users[userIds[primaryDrawer]].uid}`
    if (secondaryDrawer) {
      users[userIds[secondaryDrawer]].isDrawing = true;
      message += ` and ${users[userIds[secondaryDrawer]].uid} are drawing!`;
      sendUserMessage(this.socket.roomId, secondaryDrawer, 'selectedDrawing');
    } else {
      message += ' is drawing!';
    }

    this.io.to(this.socket.roomId).emit('drawingTeam', message);
    rooms[this.socket.roomId].roundData.wordChoices = wordChoices;
    sendUserMessage(this.socket.roomId, primaryDrawer, 'chooseWord', wordChoices);
    this.startTimer(10, false);
  }

  /**
   * Select random word.
   */
  selectWord(word) {
    rooms[this.socket.roomId].roundData.currentWord = word;

    const users = rooms[this.socket.roomId].users;
    const userIds = Object.keys(users);

    const primaryDrawer = rooms[this.socket.roomId].roundData.primaryDrawer;
    sendUserMessage(this.socket.roomId, primaryDrawer, 'word', word);

    if (rooms[this.socket.roomId].roundData.secondaryDrawer) {
      const secondaryDrawer = rooms[this.socket.roomId].roundData.secondaryDrawer;
      sendUserMessage(this.socket.roomId, secondaryDrawer, 'word', word);
    }

    this.startTimer(rooms[this.socket.roomId].settings.roundLength, true);

    const currentWordHidden = [];
    const currentWord = rooms[this.socket.roomId].roundData.currentWord;
    for (let i = 0; i < currentWord.length; i++) {
      currentWordHidden.push('_');
    }

    console.log(getHints(rooms[this.socket.roomId].roundData.currentWord));
    for (let i = 0; i < userIds.length; i++) {
      if (i === primaryDrawer || i === rooms[this.socket.roomId].roundData.secondaryDrawer) {
        continue;
      }

      sendUserMessage(this.socket.roomId, i, 'wordToGuess', currentWordHidden);
    }

    rooms[this.socket.roomId].roundData.hints = getHints(word);
  }

  /**
   * Starts the round and notifies connected clients.
   */
  startRound() {
    const {roomId} = this.socket;
    this.io.to(roomId).emit('startRound');

    if (rooms[this.socket.roomId].roundData.currentTimer !== 0) {
      this.clearTimer();
    }
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
    if (rooms[this.socket.roomId].roundData.currentTimer !== 0) {
      this.clearTimer();
    }

    rooms[this.socket.roomId].roundData.currentTime = length;
    this.io.to(this.socket.roomId).emit('timer',
      rooms[this.socket.roomId].roundData.currentTime);

    const intervalID = setInterval(() => {
      rooms[this.socket.roomId].roundData.currentTime--;
      this.io.to(this.socket.roomId).emit('timer',
        rooms[this.socket.roomId].roundData.currentTime);
      
      if (isRoundTimer && (rooms[this.socket.roomId].roundData.currentTime - 1) % 15 === 0) {
        const users = rooms[this.socket.roomId].users;
        const userIds = Object.keys(users);
        const primaryDrawer = rooms[this.socket.roomId].roundData.primaryDrawer;
        const secondaryDrawer = rooms[this.socket.roomId].roundData.secondaryDrawer;
        
        const currentHint = rooms[this.socket.roomId].roundData.hints.shift();
        if (currentHint) {
          console.log(currentHint);
          for (let i = 0; i < userIds.length; i++) {
            if (i === primaryDrawer || i === secondaryDrawer) {
              continue;
            }
  
            sendUserMessage(this.socket.roomId, i, 'wordToGuess', currentHint);
          } 
        }
      }
      
      if (isRoundTimer && rooms[this.socket.roomId].roundData.currentTime === 0) {
        this.endRound();
      }

      if (!isRoundTimer && rooms[this.socket.roomId].roundData.currentTime === 0) {
        const wordIdx = Math.trunc(Math.random() * 3);
        this.clearTimer();
        this.selectWord(rooms[this.socket.roomId].roundData.wordChoices[wordIdx]);
      }
      
      if (rooms[this.socket.roomId].roundData.currentTime === 0) {
        this.clearTimer();
      }
    }, 1000);
    rooms[this.socket.roomId].roundData.currentTimer = intervalID;
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

    console.log(wordChoices);
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
      } while (primaryDrawerIdx === secondaryDrawerIdx);
    }

    rooms[this.socket.roomId].roundData.secondaryDrawer = secondaryDrawerIdx;
  }

  endRound() {
    this.io.to(this.socket.roomId).emit('endRound');
    rooms[this.socket.roomId].roundData.roundInProgress = false;
    
    const newDrawer = rooms[this.socket.roomId].roundData.primaryDrawer + 1;
    const users = rooms[this.socket.roomId].users;
    if (newDrawer >= Object.keys(users).length) {
      newDrawer = 0;
    }

    this.clearTimer();
    rooms[this.socket.roomId].roundData.primaryDrawer = newDrawer;
    rooms[this.socket.roomId].roundData = new Round(newDrawer);

    const userIds = Object.keys(users);
    userIds.forEach((userId) => {
      users[userId].isDrawing = false;
      users[userId].guessedWord = false;
    });

    console.log(rooms[this.socket.roomId].currentRound);
    console.log(rooms[this.socket.roomId].settings.numRounds);
    if (rooms[this.socket.roomId].currentRound < rooms[this.socket.roomId].settings.numRounds - 1) {
      this.prepareRound();
    } else {
      this.io.to(this.socket.roomId).emit('endGame');
    }
  }

  clearTimer() {
    console.log('Clearing: ' + rooms[this.socket.roomId].roundData.currentTimer);
    clearInterval(rooms[this.socket.roomId].roundData.currentTimer);
    this.io.to(this.socket.roomId).emit('timer', 0);
  }
}
module.exports = {
  Game,
};
