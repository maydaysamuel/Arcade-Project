// always test for false values first

const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#status");
const restartButton = document.querySelector("#restart");
const winningConditions = [

    //row winners
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //column winners
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //diagonal winners
    [0, 4, 8],
    [2, 4, 6]

];

let board = ["", "", "", "", "", "", "", "", ""]; // empty strings to put in X or O

let currentPlayer = "X"; // game will start with X

// game phase
let running = false;



function initialState() { // beginning of game
    // change game phase
    running = true;

    // select each cell and adding listener and function
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    // display who's turn in browser
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;

    // listener for restart and function
    restartButton.addEventListener("click", restartGame);



}

function cellClicked() {

    // grabbing the data attribute of each cell
    const cellIdx = this.getAttribute("cell-data");

    // if the space is NOT empty and game is NOT running, return
    if (board[cellIdx] != "" || !running) {
        return;
    }
    // otherwise update the cell
    updateCell(this, cellIdx);

    // and check if theres a win
    checkWinner();

}

function updateCell(cell, idx) {

    // the board's index needs to be set to the current player x or o
    board[idx] = currentPlayer;

    // insert X or O
    cell.innerText = currentPlayer;

}

function swapPlayer() {

    // change the player
    if (currentPlayer === "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }

    // update the text in browser
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;

}

function checkWinner() {

    let gameWon = false;

    // loop through winning arrays
    for (let i = 0; i < winningConditions.length; i++) {

        // store idxs in variable
        const condIdx = winningConditions[i];
        const cellsOne = board[condIdx[0]];
        const cellsTwo = board[condIdx[1]];
        const cellsThree = board[condIdx[2]];

        // if there are any blanks, continue
        if (cellsOne == "" || cellsTwo == "" || cellsThree == "") {
            continue;
        }

        // but, if there is a match, game is won and loop can break
        if (cellsOne == cellsTwo && cellsTwo == cellsThree) {
            gameWon = true;
            break;
        }
    }

    if (gameWon == true) {
        // tell users the winner and stop the game phase
        gameStatus.innerText = `${currentPlayer} wins!`;
        running = false;
    }
    // else if the board does NOT have a space, therefore doesnt have a winner
    // and end game phase
    else if (!board.includes("")) {
        gameStatus.innerText = `It was a tie!`;
        running = false;
    }
    // else continue swapping players
    else {
        swapPlayer();
    }
}

function restartGame() {

    running = true;
    // clear the board
    cells.forEach(cell => cell.innerText = "");
    board = ["", "", "", "", "", "", "", "", ""];
    // reset first player
    currentPlayer = "X";
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;

}

initialState();
updateCell();
cellClicked();
swapPlayer();
checkWinner();
restartGame();