const getGuesserScore = (gameLength, currentGameTime) => {
  return Math.floor((currentGameTime / gameLength) * 500);
};

module.exports = {
  getGuesserScore,
}
