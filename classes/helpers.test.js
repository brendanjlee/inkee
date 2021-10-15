import { getScore } from "./helpers";

test('getScore', () => {
    const now = Date.now() / 1000;
    const later = (Date.now() + 10000) / 1000;
    const roundTime = roundTime / 1000;
    expect(getScore(now, roundTime)).toBe(Math.floor(((roundTime - elapsedTime) / roundTime) * 500))
});