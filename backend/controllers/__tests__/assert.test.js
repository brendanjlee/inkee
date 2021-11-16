const {assert} = require('./assert');

describe('Assert Test', () => {
  test('Assert False Default Message', (done) => {
    try {
      assert(false);
    } catch (error) {
      if (error.message === 'Assertion failed') {
        done();
      }
    }
  });

  test('Assert False Custom Message', (done) => {
    try {
      assert(false, 'False!');
    } catch (error) {
      if (error.message === 'False!') {
        done();
      }
    }
  });

  test('Assert True', (done) => {
    try {
      assert(true);
      done();
    } catch (error) {}
  });
}); 
