const {getGuesserScore} = require('../helpers');
const {getHints} = require('../helpers');
const {assert} = require('./assert');

describe('Helpers Test', () => {
  test('getGuesserScore 1 30', (done) => {
    const gameLength = 30;
    const currentTime = 1;

    const expectedScore = Math.floor((currentTime / gameLength) * 500);
    assert(getGuesserScore(gameLength, currentTime) === expectedScore);
    // Assert that value is not a float.
    assert(getGuesserScore(gameLength, currentTime) % 1 === 0);
    done();
  });

  test('getGuesserScore 1 150', (done) => {
    const gameLength = 150;
    const currentTime = 1;

    const expectedScore = Math.floor((currentTime / gameLength) * 500);
    assert(getGuesserScore(gameLength, currentTime) === expectedScore);
    // Assert that value is not a float.
    assert(getGuesserScore(gameLength, currentTime) % 1 === 0);
    done();
  });

  test('getHints 10', (done) => {
    const word = 'TestTest10';
    const length = 5;
    assert(getHints(word).length === length);
    // Assert that value is not a float.
    assert(getHints(word).length % 1 === 0);
    done();
  });

  test('getHints 20', (done) => {
    const word = 'TestTest20TestTest20';
    const length = 10;
    assert(getHints(word).length === length);
    // Assert that value is not a float.
    assert(getHints(word).length % 1 === 0);
    done();
  });
});
