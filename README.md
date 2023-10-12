# Snakes and Ladders

## Game Objective -
First player to reach the end by moving across the board from square one to the final square(100) wins!

## Series of Events -
1. Start the game
2. Select number of players (RULE => n>2)
3. Get their names
4. Player 1 rolls the dice  (RULE)
5. Player 1 move gets marked on the board.
    - If rolled output is 6 , one more chance to roll the dice and make the move.
6. If encoutner a ladder end ,move up the ladder.
7. If encoutner a snake head ,move down to the tail.
8. Next player rolls the dice and makes the move.
9. Reapeat across every player in the list, untill any one player reaches 100 
    - Player move cannot go beyond 100,if so player position reamains unchanged. (RULE)
10. Congratulate the winner and exit.
    - Can add the feature to continue the game to let other players play(if players>2) 


## Requirements- 
1. Store the player names.[list - can store multiple players]  
2. Store the board 
    - Board can be represented as a 2D array with numbers from 1 to 100(if representing in a GUI) - but would be complex to make the user move.
    - In this CLI implementation just have used a list to store the positions.
    - Store the snake and ladder positons with their associated movement(+ve for ladder / -ve for snake)
3. RollDie Fucntion - random number generator from 1 to 6.
3. Game Status - 
    - If game in progress = -1,
    - If any player have reached 100 = Store playerIndex and exit.
4. Game orchestration : Turn by turn play - Cycle between the list for other players starting from 1.