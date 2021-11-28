class Round {
  constructor() {
    this.currentRound = 0;
    this.currentTimer = 0;
    this.currentTime = 0;
    this.roundInProgress = false;
    this.currentWord = 'TestWord';
  }
};

module.exports = {
  Round,
};
