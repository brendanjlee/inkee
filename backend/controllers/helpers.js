/* global rooms */
const GraphemeSplitter = require('grapheme-splitter');
const splitter = new GraphemeSplitter();

const getGuesserScore = (gameLength, currentGameTime) => {
  return Math.floor((currentGameTime / gameLength) * 500);
};

function getHints(word) {
  let hints = [];
  const length = splitter.countGraphemes(word);
  const hintsCount = Math.floor(0.5 * length);
  const graphemes = splitter.splitGraphemes(word);
  let prevHint = graphemes.map((char) => (char !== ' ' ? '_' : ' '));
  
  while (hints.length !== hintsCount) {
    const loc = Math.trunc(Math.random() * word.length);
    if (prevHint[loc] !== '_') {
      continue;
    }
    prevHint = [...prevHint.slice(0, loc), graphemes[loc], ...prevHint.slice(loc + 1)];
    hints.push(prevHint);
  }
  return hints;
}

const prepareUser = (user) => {
  const cleanUser = Object.assign({}, user);
  delete cleanUser.socket;
  return cleanUser;
};

const sendUserMessage = (roomId, index, type, data = undefined) => {
  const users = rooms[roomId].users;
  const userIds = Object.keys(users);

  if (!users[userIds[index]]) {
    return;
  }

  if (data) {
    users[userIds[index]].socket.emit(type, data);
  } else {
    users[userIds[index]].socket.emit(type);
  }
};

module.exports = {
  getGuesserScore,
  prepareUser,
  getHints,
  sendUserMessage,
};
