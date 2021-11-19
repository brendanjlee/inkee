const getScore = (gameLength, currentGameTime) => {
  return Math.floor((currentGameTime / gameLength) * 500);
};

module.exports = {
  getScore,
}
