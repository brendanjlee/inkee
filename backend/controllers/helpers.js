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
  
  const indices = Array.from(Array(word.length).keys());

  while (hints.length !== hintsCount) {
    const loc = Math.trunc(Math.random() * indices.length);
    indices.splice(loc, 1);

    prevHint = [...prevHint.slice(0, loc), graphemes[loc], ...prevHint.slice(loc + 1)];
    hints.push(prevHint);
  }
  
  return hints;
}

/**
 * Sanitizes the user object so it can be sent over socket.
 * 
 * @param {object} user the user object being sanitized.
 * @returns {object} the sanitized user.
 */
const prepareUser = (user) => {
  const cleanUser = Object.assign({}, user);
  delete cleanUser.socket;
  return cleanUser;
};

/**
 * Sends a socket message to the specified user (by index).
 * 
 * @param {object} roomId the room ID of the user.
 * @param {int} index the index of the user in the user map.
 * @param {string} type the type of the socket event.
 * @param {object} data the data being sent over the socket.
 */
/* istanbul ignore next */
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
