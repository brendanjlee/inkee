const helpers = require('./helpers');

test('getScore', () => {
    const now = Date.now() / 1000;
    const later = (Date.now() + 10000) / 1000;
    const roundTime = roundTime / 1000;
    expect(helpers.getScore(now, roundTime)).toBe(Math.floor(((roundTime - elapsedTime) / roundTime) * 500))
});

test('populateDisplayTime', () => {
    const roundTime = roundTime / 1000;
    const start = Math.floor(roundTime / 2);
    const hints = Math.floor(start / 3)
    expect(hints).toBe(Math.floor(start / 3));
});

test('get3Words', () => {
    expect(helpers.get3Words(10)).length.toBe(0);
    expect(helpers.get3Words(5)).length.toBe(3);
});