const {
  applySnakesAndLadders,
  calculateNewPosition,
  snakesAndLaddersBoard,
} = require("./snakes-and-ladders.js");

const players = 4;
const names = ["P1", "P2", "P3", "P4"];
const playerPosition = [0, 0, 0, 0];

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
  const result = rollDice();
  console.log(`${names[playerIndex]} rolled a ${result}`);
  return calculateAndSetNewPosition(result, playerIndex);
}
function calculateAndSetNewPosition(diceResult, playerIndex) {
  let newPosition = calculateNewPosition(playerIndex, diceResult, names);
  while (diceResult === 6 && newPosition <= 150) {
    
    diceResult = rollDice();
    console.log(
      `${names[playerIndex]} gets another chance, next roll: ${diceResult}`
    );
    newPosition = calculateNewPosition(playerIndex, diceResult, names);
    playerPosition[playerIndex] = newPosition;
  
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
