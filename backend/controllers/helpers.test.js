const helpers = require('./helpers');

//Method to Test Score
test('getScore', () => {
    const gameLength = 2;
    const currentGameTime = 1;
    expect(helpers.getGuesserScore(gameLength, currentGameTime))
      .toBe(Math.floor((currentGameTime / gameLength) * 500));
});
