let currentPlayer;
let gameBoard;
let gameMode;
let gameOver;


const homeScreen = document.getElementById('home-screen');
const gameContainer = document.querySelector('.game-container');
const gameBoardElement = document.querySelector('.game-board');
const resultMessage = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');


gameContainer.style.display = 'none';


document.getElementById('two-players').addEventListener('click', function() {
    gameMode = 'two-players';
    startGame();
});

document.getElementById('computer').addEventListener('click', function() {
    gameMode = 'computer';
    startGame();
});


function startGame() {
    homeScreen.style.display = 'none';
    gameContainer.style.display = 'flex';

    
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;

    renderGameBoard();
}

gameBoardElement.addEventListener('click', function(event) {
    if (gameOver) return;

    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.dataset.index;

    if (gameBoard[clickedCellIndex] === '') {
        gameBoard[clickedCellIndex] = currentPlayer;
        renderGameBoard();
        checkWin();
        togglePlayer();

        if (gameMode === 'computer' && currentPlayer === 'O' && !gameOver) {
            computerMove();
        }
    }
});

function renderGameBoard() {
    gameBoardElement.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.dataset.index = index;
        gameBoardElement.appendChild(cell);
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            resultMessage.textContent = `${gameBoard[a]} wins!`;
            gameOver = true;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        resultMessage.textContent = "It's a draw!";
        gameOver = true;
    }
}


function computerMove() {
    const emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') acc.push(index);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const moveIndex = emptyCells[randomIndex];
    gameBoard[moveIndex] = currentPlayer;
    renderGameBoard();
    checkWin();
    togglePlayer();
}


restartButton.addEventListener('click', function() {
    resultMessage.textContent = '';
    startGame();
});


homeButton.addEventListener('click', function() {
    gameContainer.style.display = 'none';
    homeScreen.style.display = 'flex';
});
