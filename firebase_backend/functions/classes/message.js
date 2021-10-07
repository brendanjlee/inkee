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

  static getCurrentTime() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
      + today.getDate();
    return date + '/' + time;
  }

  /**
   * Constructs a Message object from deserialized JSON object.
   * 
   * @param {Object} obj deserialized object that has been parsed from JSON.
   * @return {Object} a Message object.
   */
   deserialize(obj) {
    return new Message(obj.uid, obj.username, obj.messageId, obj.gameId, obj.message);
  }
}

export default {
  Message,
}
