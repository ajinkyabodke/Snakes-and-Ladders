const board = require("./board.js");
const { snakesAndLaddersBoard } = board;

let players = 4; // Number of players (input can be taken from the user)
const names = ["P1", "P2", "P3", "P4"]; //variable number of users,so a list.
let playerPosition = [0, 0, 0, 0]; //list instead of 2D array ,for easy movement calculations and we not persist the traversed locations.

const snakesAndLadders = {
  //postive values are ladders and negative are snakes(making implementation easy)
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

function rollDice() {
  //generate random number from 1 to 6
  return Math.floor(Math.random() * 6) + 1;
}

function applySnakesAndLadders(position, playerIndex) {
  const movement = snakesAndLadders[position];

  if (movement !== undefined) {
    //to check if a snake or a ladder exists
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
    return position + movement; //returning the calculated position
  }

  return position; //returning the position as it is if snake or ladder not encountered
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
  let result = rollDice();
  do {
    // Loop until a non-6 is rolled or the player exceeds the board size
    result = rollDice();
    console.log(`${names[playerIndex]} rolled a ${result}`);

    // Update player position if within the board size
    if (playerPosition[playerIndex] + result <= 100) {
      playerPosition[playerIndex] += result;
    }

    // Calculate postion in case of snakes and ladders
    playerPosition[playerIndex] = applySnakesAndLadders(
      playerPosition[playerIndex],
      playerIndex
    );

    if (result === 6 && playerPosition[playerIndex] <= 100) {
      console.log(
        `${names[playerIndex]} gets another chance, next roll: ${result}`
      );
      // Additional check to ensure the player's position is updated if it's still less than or equal to 100
      if (playerPosition[playerIndex] + result <= 100) {
        playerPosition[playerIndex] += result;
      }
      playerPosition[playerIndex] = applySnakesAndLadders(
        playerPosition[playerIndex],
        playerIndex
      );
    }
  } while (result === 6 && playerPosition[playerIndex] <= 100);
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

game();
