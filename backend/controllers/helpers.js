/* global rooms */
const GraphemeSplitter = require('grapheme-splitter');
const splitter = new GraphemeSplitter();

const getGuesserScore = (gameLength, currentGameTime) => {
  return Math.floor((currentGameTime / gameLength) * 500);
};

function hideWord() {
  this.socket.to(this.socket.roomId).emit('hideWord', { word: splitter.splitGraphemes('TestWord').map((char) => (char !== ' ' ? '_' : char)).join('') });
}

function getHints(word, roomId) {
  let hints = [];
  const length = splitter.countGraphemes(word);
  const hintsCount = Math.floor(0.5 * length);
  const graphemes = splitter.splitGraphemes(word);
  let prevHint = graphemes.map((char) => (char !== ' ' ? '_' : ' '));
  while (hints.length !== hintsCount) {
    const loc = chance.integer({ min: 0, max: wordLength - 1 });
    if (prevHint[loc] !== '_') {
      continue;
    }
    prevHint = [...prevHint.slice(0, loc), graphemes[loc], ...prevHint.slice(loc + 1)];
    hints.push(prevHint);
  }
  hints = hints.map((hint) => hint.join(''));
  const time = Math.floor(rooms[roomId].currentTime / 2);
  const hintInterval = Math.floor(time / (hints.length * 2));
  return hints.map((hint, i) => ({
      hint,
      displayTime: Math.floor((time - (i * hintInterval)) / 1000),
  }));
}

const pickDrawingTeam = (users) => {

};

const prepareUser = (user) => {
  const cleanUser = Object.assign({}, user);
  delete cleanUser.socket;
  return cleanUser;
}

module.exports = {
  getGuesserScore,
  prepareUser,
  getHints,
  hideWord,
}
