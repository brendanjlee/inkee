const { User } = require('../../classes/user');
const {getGuesserScore, prepareUser, getHints} = require('../helpers');
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

  test('prepareUser', (done) => {
    const user = new User('test', 'test', false, 'someSocket');
    assert(prepareUser(user).socket === undefined);
    done();
  });

  test('getHints', (done) => {
    const hints = getHints('test hello');
    assert(hints.length !== 0);
    done();
  });
});
