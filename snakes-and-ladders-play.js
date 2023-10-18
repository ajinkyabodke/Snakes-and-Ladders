const {
  applySnakesAndLadders,
  calculateNewPosition,
} = require("./snakes-and-ladders.js");

const players = 4; // Number of players (input can be taken from the user)
const names = ["P1", "P2", "P3", "P4"]; //variable number of users,so a list.
const playerPosition = [0, 0, 0, 0]; //list instead of 2D array ,for easy movement calculations and we not persist the traversed locations.

//board
//not using this in implementation,just a visual represent at first.
function createBoard(rows, cols) {
  // Initializing a 2D array - 10 x 10 grid to represent the board with values from 1 to 100.
  const board = new Array(rows);

  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
  }

  let count = 1;
  let isOddRow = true; // To determine whether to fill the row from left-to-right or vice versa.

  for (let i = rows - 1; i >= 0; i--) {
    if (isOddRow) {
      //left to right
      for (let j = 0; j < cols; j++) {
        board[i][j] = count++;
      }
    } else {
      //right to left
      for (let j = cols - 1; j >= 0; j--) {
        board[i][j] = count++;
      }
    }
    isOddRow = !isOddRow;
  }

  //snakes and ladders (you can customize these)
  board[9][3] = "🪜";
  board[8][8] = "🪜";
  board[8][6] = "🪜";
  board[7][1] = "🪜";
  board[7][7] = "🐍";
  board[6][3] = "🐍";
  board[5][0] = "🪜";
  board[4][6] = "🪜";
  board[2][5] = "🐍";
  board[0][4] = "🐍";
  board[0][6] = "🐍";

  return board;
}

const rows = 10;
const cols = 10;
const snakesAndLaddersBoard = createBoard(rows, cols);

function rollDice() {
  //generate random number from 1 to 6
  return Math.floor(Math.random() * 6) + 1;
}

function printBoard() {
  //Print the positions of the players
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
  while (diceResult === 6 && newPosition <= 100) {
    // Loop until a non-6 is rolled or the player exceeds the board size
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
