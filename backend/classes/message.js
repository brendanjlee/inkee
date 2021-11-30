/** Represents a Message object for game chat boards. */
class Message {
  /**
   * Constructs a new class object of Message.
   *
   * @param {string} uid the userId associated with the message.
   * @param {string} username the username associated with the message.
   * @param {string} messageId the ID associated with the new message.
   * @param {string} gameId the game ID where the message was composed.
   * @param {string} message the text of the chat message.
   */
  constructor(uid, username, messageId, gameId, message) {
    this.uid = uid;
    this.username = username;
    this.messageId = messageId;
    this.gameId = gameId;
    this.message = message;
    this.timestamp = getCurrentTime();
  }

  /**
   * Returns the current time
   * @return {object} current date in the format YYYY-MM-DD/hh:mm:ss
   */
  static getCurrentTime() {
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' +
      today.getSeconds();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +
      today.getDate();
    return date + '/' + time;
  }
}

module.exports = {
  Message,
};
