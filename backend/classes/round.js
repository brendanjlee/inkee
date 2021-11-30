class Round {
  constructor() {
    this.currentRound = 0;
    this.currentTimer = 0;
    this.currentTime = 0;
    this.roundInProgress = false;
    this.currentWord = 'TestWord';
    this.wordChoices = [];
    this.primaryDrawer = 0;
    this.secondaryDrawer = 0;
    this.totalScore = 0;
  }
};

module.exports = {
  Round,
};
