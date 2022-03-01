// PLAYERS is an array of strings where each string is a name of a player
// Two times table game

class Game {
  constructor(players) {
    [this.next, this.deletePlayer] = generateCycler(players);
    this.currentPlayer = this.next();
    this.gameOver = false;
  }

  play(num) {
    if (this.gameOver) {
      return `${this.currentPlayer} has won!`;
    }
    if (num % 2 === 0) {
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
