const assert = (condition, message = undefined) => {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

module.exports = {
  assert,
};
