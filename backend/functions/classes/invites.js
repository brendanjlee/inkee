/**
 * Creates an invite object for the specified game ID.
 * 
 * @param {string} gameId the game ID of the new invite object.
 * @return {Object} the generated invite for the game.
 */
function Invite(gameId) {
  return generateInvite(5);
}

/**
 * Returns a randomly generated invite code.
 * 
 * @param {number} length the length of the invite code.
 * @return {string} the generated invite code.
 */
function generateInvite(length) {
  let invite = '';
  for (let i = 0; i < length; i++) {
      let numOrLetter = parseInt(Math.random() * 2, 10);
      let nextVal = null;
      switch (numOrLetter) {
          case 0:
              nextVal = parseInt(Math.random() * 10, 10);
              break;
          case 1:
              const baseLine = 'a'.charCodeAt(0);
              const val = baseLine + parseInt(Math.random() * 26, 10);
              nextVal = String.fromCharCode(val);
      }
      invite = invite.concat(nextVal);
  }
  
  return invite;
}

module.exports = {
  Invite,
}
