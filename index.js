// PLAYERS is an array of strings where each string is a name of a player
// Times table game, default times table is the 2 times table

class Game {
  constructor(
    players,
    timesTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    timeAllowed = 5
  ) {
    [this.next, this.deletePlayer] = generateCycler(players);
    this.currentPlayer = this.next();
    this.gameOver = false;
    this.timesTables = timesTables;
    this.timeAllowed = timeAllowed;
    this.numberOfPlays = 0;
    this.timesTable =
      timesTables[Math.floor(Math.random() * this.timesTables.length)];
  }

  play(num) {
    if (this.gameOver) {
      return `${this.currentPlayer} has won!`;
    }
    if (this.numberOfPlays === 0) {
      this.startTime = new Date();
      this.numberOfPlays++;
      return `It is ${this.currentPlayer}'s turn. Give me a multiple of ${this.timesTable}.`;
    }
    this.numberOfPlays++;
    this.endTime = new Date();
    const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    this.startTime = new Date();

    const nextTimesTable =
      this.timesTables[Math.floor(Math.random() * this.timesTables.length)];

    if (seconds <= this.timeAllowed && num % this.timesTable === 0) {
      this.currentPlayer = this.next();
      this.timesTable = nextTimesTable;
      return `It is ${this.currentPlayer}'s turn. Give me a multiple of ${this.timesTable}.`;
    }
    const deadPlayer = this.currentPlayer;
    this.gameOver = this.deletePlayer();
    this.currentPlayer = this.next();
    this.timesTable = nextTimesTable;
    return this.gameOver
      ? `${this.currentPlayer} has won!`
      : `${deadPlayer} has lost the game. It is ${this.currentPlayer}'s turn. Give me a multiple of ${this.timesTable}.`;
  }
}

function generateCycler(players) {
  let ix = 0;
  let element;

  function next() {
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
  return [next, deletePlayer];
}
