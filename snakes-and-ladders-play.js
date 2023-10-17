const {
  applySnakesAndLadders,
  calculateNewPosition,
  snakesAndLaddersBoard,
} = require("./snakes-and-ladders.js");

let players = 4;
const names = ["P1", "P2", "P3", "P4"];
let playerPosition = [0, 0, 0, 0];

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function printBoard() {
  console.log("Current Board:");
  for (let i = 0; i < players; i++) {
    console.log(`${names[i]} position: ${playerPosition[i]}`);
  }
  console.log();
}

function takeTurn(playerIndex) {
  let result = rollDice();
  console.log(`${names[playerIndex]} rolled a ${result}`);

  let newPosition = calculateNewPosition(playerIndex, result, names);

  while (result === 6 && newPosition <= 100) {
    console.log(
      `${names[playerIndex]} gets another chance, next roll: ${result}`
    );
    result = rollDice();
    newPosition = calculateNewPosition(playerIndex, result, names);
    
    console.log(`${names[playerIndex]} rolled a ${result}`);
    
  }

  playerPosition[playerIndex] = newPosition;
}


function game() {
  let gameStatus = -1;

  console.log("Snakes and Ladders Board:");
  for (let i = 0; i < 10; i++) {
    console.log(snakesAndLaddersBoard[i].join("\t"));
  }

  while (gameStatus === -1) {
    for (let i = 0; i < players; i++) {
      takeTurn(i);
      printBoard();

      if (playerPosition[i] >= 100) {
        gameStatus = i;
        break;
      }
    }
  }

  console.log(`${names[gameStatus]} wins!`);
}

module.exports = { game };

game();
