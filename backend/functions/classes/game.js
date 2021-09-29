/**
 * Configures and returns a new game object.
 * 
 * @param {string} uniqueId the username of the user.
 * @param {number} numRounds the number of rounds that will be played.
 * @param {number} roundLength the number of seconds that each round will last.
 * @param {number} lobbySize the max number of users that can join the lobby.
 * @param {boolean} privateGame game is private if true, public otherwise.
 * @param {Object} lobbyOwner the owner/admin of the game lobby.
 * @return {Object} the game object formed by the parameters.
 */
function Game(uniqueId, numRounds = 1, roundLength = 60, lobbySize = 1,
  privateGame = false, lobbyOwner = null) {
  
  return {
    uniqueId: uniqueId,
    numRounds: numRounds,
    roundLength: roundLength,
    lobbySize: lobbySize,
    privateGame: privateGame,
    scoreboard: {},
    lobbyOwner: lobbyOwner,
    users: [],
  };
}

module.exports = {
  Game,
}
