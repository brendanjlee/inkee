class Round {
  constructor(primaryDrawer = 0) {
    this.currentTimer = 0;
    this.currentTime = 0;
    this.roundInProgress = false;
    this.currentWord = 'TestWord';
    this.hints = [];
    this.currentHint = [];
    this.wordChoices = [];
    this.primaryDrawer = primaryDrawer;
    this.secondaryDrawer = 0;
    this.totalScore = 0;
  }
};

module.exports = {
  Round,
};
