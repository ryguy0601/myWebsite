let board = [];
let score = 0;
let merged = Array.from({ length: 4 }, () => Array(4).fill(false));
let tile = document.querySelector(`#cord-${0}-${0}`);
let scoreDisplay = document.querySelector('#score');
let scoreAdded = document.querySelector('#addedScoreHolder');

// for touch detection
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);

let xDown = null;
let yDown = null;
let xDiff = null;
let yDiff = null;

function restart() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    merged = Array.from({ length: 4 }, () => Array(4).fill(false));
    drawBoard();
    addNum()
    addNum()
}

document.querySelector('#restartButton').addEventListener('click', restart);
document.querySelector('#restartButton').addEventListener('touchend', restart);


window.onload = function () {
    restart();
}




function loseCheck() {
    // Check if there are any zeros on the board
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (board[x][y] === 0) {
                // console.log("loseCheck");

                return false; // There are still zeros on the board
            }
        }
    }
    console.log("loseCheck");
    return lose(); // No zeros found, call the lose function
}

function lose() {
    // checks if anything can be merged
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (x != 0 && board[x - 1][y] == board[x][y]) {
                return false;
            }
            if (
                x <= board.length - 2 &&
                board[x + 1][y] == board[x][y])
             {
                return false;
            }
            if (
                y <= board.length - 2 &&
                board[x][y + 1] == board[x][y])
            {
                return false;
            }
            if (y != 0 && board[x][y - 1] == board[x][y]) {
                return false;
            }
        }
    }
    // console.log("You lose");
    return true; // No merges found, call the lose function
}



function randomNum(min, max) {
    //max is exlusive
    return Math.floor(Math.random() * (max - min)) + min;
}


function addNum() {
    //adds a random number to the board
    if(!loseCheck()){
        let x = randomNum(0, 4);
        let y = randomNum(0, 4);
        while (board[x][y] != 0) {
            x = randomNum(0, 4);
            y = randomNum(0, 4);
        }
        // console.log(0);
        board[x][y] = Math.random() < 0.5 ? 2 : 4;// 50% chance of 2 or 4
    }else{
        console.log("You lose");
        scoreDisplay.innerText = `Score: ${score} - You lose!`;
    }
    drawBoard();
}

function moveMerge(x, y, x1, y1, moved) {
    if(board[x][y] !== 0){
        if(board[x+x1][y+y1] == 0){//this if moves tiles
            moved = board[x][y];//tacks the val of the move tile and is also cheking if the tile was moved or merged
            board[x][y] = 0;
            board[x+x1][y+y1] = moved;
        }else if(//this if merges tiles
            board[x+x1][y+y1] == board[x][y] &&
            !merged[x+x1][y+y1] && !merged[x][y] // Check if the tile has already merged
        ){
            board[x+x1][y+y1] *= 2
            merged[x+x1][y+y1] = true; // Mark as merged
            board[x][y] = 0;
            moved = board[x+x1][y+y1];//tacks the val of the move tile and is also cheking if the tile was moved or merged
            updateScore(moved);
            
            // console.log(score);
            
        }
    }
    return moved;
}

// Update the score display with animation
function updateScore(newScore) {
    // animateScoreUpdate(newScore);
    // Add the score to the scoreAdded element
    let newScoreDiv = document.createElement('div');
    newScoreDiv.className = 'addedScore';
    newScoreDiv.innerText = `+${newScore}`;
    scoreAdded.appendChild(newScoreDiv);

    setTimeout(() => {
        // newScoreDiv.style.opacity = '0';
        scoreAdded.removeChild(newScoreDiv);
    }, 1010);


    // Add the score to the total score
    score += newScore;
}
// Handle arrow key functionality
function handleArrowKey(direction) {
    let moved = null; // Track if any tile was moved
    merged = Array.from({ length: 4 }, () => Array(4).fill(false)); // Track if a tile has merged

    if (direction === 'up') {
		for (let i = 0; i < board.length; i++) {
			for (let x = 1; x < board.length; x++) {
				for (let y = 0; y < board.length; y++) {
                    moved = moveMerge(x, y, -1, 0, moved);
                }
            }
        }
    } else if (direction === 'down') {
		for (let i = 0; i < board.length; i++) {
			for (let x = board.length - 2; x > -1; x--) {
				for (let y = 0; y < board.length; y++) {
                    moved = moveMerge(x, y, 1, 0, moved);
                }
            }
        }
    } else if (direction === 'left') {
		for (let i = 0; i < board.length; i++) {
			for (let x = 0; x < board.length; x++) {
				for (let y = 1; y < board.length; y++) {
                    moved = moveMerge(x, y, 0, -1, moved);
                }
            }
        }
    } else if (direction === 'right') {
		for (let i = 0; i < board.length; i++) {
			for (let x = 0; x < board.length; x++) {
				for (let y = board.length - 2; y > -1; y--) {
                    moved = moveMerge(x, y, 0, 1, moved);
                }
            }
        }
    }
    if (moved !== null) {
        addNum(); // Add a new number if a move was made
    }
    if (loseCheck()) {
        console.log("lose");
        scoreDisplay.innerHTML = `Score: ${score}<br> <span style='color:red'>You lose!</span>`;
        drawBoard();
        
    }
}

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            handleArrowKey('up');
            break;
        case 'ArrowDown':
            handleArrowKey('down');
            break;
        case 'ArrowLeft':
            handleArrowKey('left');
            break;
        case 'ArrowRight':
            handleArrowKey('right');
            break;
    }
});

function drawBoard() {
    if(!loseCheck()){
        scoreDisplay.innerText = `Score: ${score}`;
    }
    // scoreDisplay.innerText = `Score: ${score}`;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            tile = document.querySelector(`#cord-${x}-${y}`);
            tile.className = `tile tile-${board[x][y]}`;
            tile.innerText = board[x][y] !== 0 ? board[x][y] : '';
        }
        
    }
}

function getTouches(evt) {
	return evt.touches;
}
function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}
function handleTouchMove(evt) {
	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	xDiff = xDown - xUp;
	yDiff = yDown - yUp;
}

function handleTouchEnd(evt) {
	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff < 0) {
			handleArrowKey('right');
		}
		if (xDiff > 0) {
			handleArrowKey('left');
		}
	} else {
		if (yDiff > 0) {
			handleArrowKey('up');
		}
		if (yDiff < 0) {
			handleArrowKey('down');
		}
	}
	xDown = null;
	yDown = null;
	xDiff = null;
	yDiff = null;
}
