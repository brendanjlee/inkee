const {assert} = require('./assert');

describe('Assert Test', () => {
  test('Assert False', (done) => {
    try {
      assert(false);
    } catch (error) {
      done();
    }
  });

  test('Assert True', (done) => {
    try {
      assert(true);
      done();
    } catch (error) {}
  });
}); 
