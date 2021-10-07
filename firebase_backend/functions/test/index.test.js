// Testing Utilities.
const chai = require('chai');
const assert = chai.assert;

const admin = require('firebase-admin');
const projectConfig = {
  projectId: 'splat-io',
  databaseURL: 'https://splat-io-default-rtdb.firebaseio.com/'
};
const test = require('firebase-functions-test')(projectConfig);
const GameConfiguration = require('../classes/gameConfiguration');

describe('Cloud Functions', () => {
  let myFunctions;

  before(() => {
    myFunctions = require('../firebase/dbInterface');
  });

  after(() => {
    test.cleanup();
    admin.database().ref('test').remove();
  });

  describe('createGameInstance', () => {
    it('It should create a new game.', (done) => {
      const gameConfiguration = new GameConfiguration.GameConfiguration();
      const snap = test.database.makeDataSnapshot(gameConfiguration, 'test/games/11111');

      const wrapped = test.wrap(myFunctions.createGameInstance);
      return wrapped(snap).then(() => {
        return admin.database().ref('test/games/11111').once('value').then((createdSnap) => {
          assert.equal(createdSnap.val(), gameConfiguration);
        });
      });
    });
  });
});
