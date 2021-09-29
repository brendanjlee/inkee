/**
 * Configures and returns a new chat message object.
 * 
 * @param {string} uid the userId associated with the message.
 * @param {string} username the username associated with the message.
 * @param {string} messageId the ID associated with the new message.
 * @param {string} gameId the game ID where the message was composed.
 * @param {string} message the text of the chat message.
 * @return {Object} the message object formed by the parameters.
 */
function ChatMessage(uid, username, messageId, gameId, message) {
  return {
    uid: uid,
    username: username,
    messageId: messageId,
    gameId: gameId,
    message: message,
  }
}

module.exports = {
  ChatMessage,
}
