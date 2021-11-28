const getGuesserScore = (gameLength, currentGameTime) => {
  return Math.floor((currentGameTime / gameLength) * 500);
};

const pickDrawingTeam = (users) => {

};

const prepareUser = (user) => {
  const cleanUser = Object.assign({}, user);
  delete cleanUser.socket;
  return cleanUser;
}

module.exports = {
  getGuesserScore,
  prepareUser,
}
