function getScore(startTime, gameTime) {
  const time = Date.now() / 1000;
  const elapsedTime = time - startTime;
  const timeInGame = gameTime / 1000;
  return Math.floor(((timeInGame - elapsedTime) / timeInGame) * 500);
}

module.exports = {
  getScore,
};