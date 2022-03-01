// PLAYERS is an array of strings where each string is a name of a player
// Times table game, default times table is the 2 times table

class Game {
  constructor(players, timesTable = 2, timeAllowed = 5) {
    [this.next, this.deletePlayer] = generateCycler(players);
    this.currentPlayer = this.next();
    this.gameOver = false;
    this.timesTable = timesTable;
    this.timeAllowed = timeAllowed;
    this.startTime = new Date();
  }

  play(num) {
    this.endTime = new Date();
    const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    this.startTime = new Date();

    if (this.gameOver) {
      return `${this.currentPlayer} has won!`;
    }
    if (seconds <= 5 && num % this.timesTable === 0) {
      this.currentPlayer = this.next();
      return `It is ${this.currentPlayer}'s turn.`;
    }
    const deadPlayer = this.currentPlayer;
    this.gameOver = this.deletePlayer();
    this.currentPlayer = this.next();
    return this.gameOver
      ? `${this.currentPlayer} has won!`
      : `${deadPlayer} has lost the game. It is ${this.currentPlayer}'s turn`;
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
