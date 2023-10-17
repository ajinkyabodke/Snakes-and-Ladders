const board = require("./board.js");
const { snakesAndLaddersBoard } = board;

const snakesAndLadders = {
  4: 52,
  12: 38,
  14: 41,
  22: 36,
  28: -18,
  37: -34,
  41: 28,
  54: 34,
  75: -43,
  94: -23,
  96: -54,
};

let playerPosition = [0, 0, 0, 0];

function applySnakesAndLadders(position, playerIndex, names) {
  const movement = snakesAndLadders[position];

  if (movement !== undefined) {
    if (movement > 0) {
      console.log(
        `${names[playerIndex]} climbed up a ladder from ${position} to ${
          position + movement
        }`
      );
    } else if (movement < 0) {
      console.log(
        `Oops! ${names[playerIndex]} encountered a snake from ${position} to ${
          position + movement
        }`
      );
    }
    return position + movement;
  }

  return position;
}

function calculateNewPosition(playerIndex, result, names) {
  if (playerPosition[playerIndex] + result <= 100) {
    playerPosition[playerIndex] += result;
  }


  playerPosition[playerIndex] = applySnakesAndLadders(playerPosition[playerIndex] , playerIndex, names);
    
  return playerPosition[playerIndex] ;
}

module.exports = {
  applySnakesAndLadders,
  calculateNewPosition,
  snakesAndLaddersBoard,
  playerPosition,
};
