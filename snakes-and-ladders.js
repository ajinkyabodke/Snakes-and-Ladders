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

const playerPosition = [0, 0, 0, 0];

function applySnakesAndLadders(position, playerIndex, names) {
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

function calculateNewPosition(playerIndex, result, names) {
  // Update player position if within the board size
  if (playerPosition[playerIndex] + result <= 100) {
    playerPosition[playerIndex] += result;
  }

  // Calculate postion in case of snakes and ladders
  playerPosition[playerIndex] = applySnakesAndLadders(
    playerPosition[playerIndex],
    playerIndex,
    names
  );

  return playerPosition[playerIndex];
}

module.exports = {
  applySnakesAndLadders,
  calculateNewPosition,
  playerPosition,
};
