// PLAYERS is an array of strings where each string is a name of a player
// Times table game
// To start the game, in the console enter:
// const game = new Game(['Emma','Jenna','Raj'])
// game.play()
// game.play(8) (for example if Emma was asked for a multiple of 8)
class Game {
  constructor(
    players,
    timesTables = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    timeAllowed = 10,
    maxNum = 1000
  ) {
    [this.nextPlayer, this.deletePlayer] = generateCycler(
      players.map((player) => {
        return {
          name: player,
          lives: 2,
        };
      })
    );
    this.currentPlayer = this.nextPlayer();
    this.gameOver = false;
    this.timesTables = timesTables;
    this.timeAllowed = timeAllowed;
    this.numberOfPlays = 0;
    this.timesTable =
      timesTables[Math.floor(Math.random() * this.timesTables.length)];
    this.memory = [];
    this.maxNum = maxNum;
  }

  play(num) {
    if (this.gameOver) {
      return `${this.currentPlayer.name} has won!`;
    }
    if (this.numberOfPlays === 0) {
      this.startTime = new Date();
      this.numberOfPlays++;
      return `It is ${this.currentPlayer.name}'s turn. Give me a multiple of ${this.timesTable}.`;
    }
    this.numberOfPlays++;
    this.endTime = new Date();
    const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    this.startTime = new Date();

    const nextTimesTable =
      this.timesTables[Math.floor(Math.random() * this.timesTables.length)];

    if (
      seconds <= this.timeAllowed &&
      !this.memory.includes(num) &&
      num % this.timesTable === 0 &&
      num <= this.maxNum
    ) {
      this.memory.push(num);
      this.currentPlayer = this.nextPlayer();
      this.timesTable = nextTimesTable;
      return `It is ${this.currentPlayer.name}'s turn. Give me a multiple of ${this.timesTable}.`;
    }
    if (
      seconds <= this.timeAllowed &&
      this.memory.includes(num) &&
      num % this.timesTable === 0
    ) {
      return `${num} has already been used. ${this.currentPlayer.name}, give me a multiple of ${this.timesTable} which has not been given before.`;
    }
    if (seconds <= this.timeAllowed && num > this.maxNum) {
      return `You must give a number which is less than ${this.maxNum}. ${this.currentPlayer.name}, give me a multiple of ${this.timesTable}. `;
    }
    this.currentPlayer.lives--;
    const playerJustDied = this.currentPlayer.lives === 0;
    const prevPlayer = this.currentPlayer;
    if (playerJustDied) {
      this.gameOver = this.deletePlayer();
    }
    this.currentPlayer = this.nextPlayer();
    this.timesTable = nextTimesTable;

    const rtnValueWhenGameStillOn = playerJustDied
      ? `${prevPlayer.name} has lost the game. It is ${this.currentPlayer.name}'s turn. Give me a multiple of ${this.timesTable}.`
      : `${prevPlayer.name} has lost a life. It is ${this.currentPlayer.name}'s turn. Give me a multiple of ${this.timesTable}.`;

    return this.gameOver
      ? `${this.currentPlayer.name} has won!`
      : rtnValueWhenGameStillOn;
  }
}

function generateCycler(players) {
  let ix = 0;
  let element;

  function nextPlayer() {
    element = players[ix];
    ix = (ix + 1) % players.length;
    return element;
  }

  function deletePlayer() {
    players = players.filter((e) => e !== element);
    ix = (ix - 1) % players.length;
    const gameOver = players.length === 1;
    return gameOver;
  }
  return [nextPlayer, deletePlayer];
}

// {currentPlayer
// timesTable
// message:
// players}
