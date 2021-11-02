/** Generates an invite code for ongoing games. */
class Invite {
  /**
   * Constructs a new Invite object.
   *
   * @param {string} gameId the game ID that the user is associated with.
   */
  constructor() {
    this.inviteCode = this.generateInvite(5);
  }

  /**
   * Returns a randomly generated invite code.
   *
   * @param {number} length the length of the invite code.
   * @return {string} the generated invite code.
   */
  generateInvite(length) {
    let invite = '';
    for (let i = 0; i < length; i++) {
      const numOrLetter = parseInt(Math.random() * 2, 10);
      let nextVal = null;
      switch (numOrLetter) {
        case 0:
          nextVal = parseInt(Math.random() * 10, 10);
          break;
        case 1:
          const baseLine = 'a'.charCodeAt(0);
          const val = baseLine + parseInt(Math.random() * 26, 10);
          nextVal = String.fromCharCode(val);
          break;
      }
      invite = invite.concat(nextVal);
    }

    return invite;
  }

  /**
   * Constructs a Invite object from deserialized JSON object.
   *
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} an Invite object.
   */
  deserialize(obj) {
    return new Invite(obj.inviteCode);
  }
}

module.exports = {
  Invite,
};
