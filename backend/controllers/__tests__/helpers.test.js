const {getScore} = require('../helpers');
const {assert} = require('./assert');

describe('Helpers Test', () => {
  test('getScore 1 30', (done) => {
    const gameLength = 30;
    const currentTime = 1;

    const expectedScore = Math.floor((currentTime / gameLength) * 500);
    assert(getScore(gameLength, currentTime) === expectedScore);
    // Assert that value is not a float.
    assert(getScore(gameLength, currentTime) % 1 === 0);
    done();
  });

  test('getScore 1 150', (done) => {
    const gameLength = 150;
    const currentTime = 1;

    const expectedScore = Math.floor((currentTime / gameLength) * 500);
    assert(getScore(gameLength, currentTime) === expectedScore);
    // Assert that value is not a float.
    assert(getScore(gameLength, currentTime) % 1 === 0);
    done();
  });
});
