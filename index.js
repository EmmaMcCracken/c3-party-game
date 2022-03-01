// PLAYERS is an array of strings where each string is a name of a player
// Two times table game
// TO-DO: return winning message

class Game {
  constructor(players) {
    this.players = players;
    [this.next, this.deletePlayer] = generateCycler(players);
    this.currentPlayer = this.next();
  }

  play(num) {
    if (num % 2 === 0) {
      this.currentPlayer = this.next();
      return `It is ${this.currentPlayer}'s turn.`;
    } else {
      const deadPlayer = this.currentPlayer;
      this.deletePlayer();
      this.currentPlayer = this.next();
      return `${deadPlayer} has lost the game. It is ${this.currentPlayer}'s turn`;
    }
  }
}

function generateCycler(arr) {
  let ix = 0;
  let element;

  function next() {
    element = arr[ix];
    ix = (ix + 1) % arr.length;
    return element;
  }

  function deletePlayer() {
    arr = arr.filter((e) => e !== element);
    ix = (ix - 1) % arr.length;
  }
  return [next, deletePlayer];
}
