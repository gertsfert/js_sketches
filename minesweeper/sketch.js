// Minesweeper

var canvas;

// prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr
}



var grid;
var cols = 10;
var rows = 10;
var w = 40;

var isGameOver = false;
var totalBees = 10;
var totalFlagged = 0;
var totalRevealed = 0;

var count = 0;

function setup() {
    progString = createDiv('PROGRESS --- STRING');
    progString.parent('progressString')
    resetButton = createButton('Reset')
    resetButton.mousePressed(resetGame);

    canvas = createCanvas(cols * w + 1, rows * w + 1);
    canvas.parent('canvasContainer');

    setupGame();
}

function setupGame() {
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
    // place bees
    for (var i = 0; i < totalBees; i++) {
        placeBee()
    }
}

function placeBee() {
    bee_cell = grid[floor(random() * cols)][floor(random() * rows)]
    if (!bee_cell.bee) {
        bee_cell.bee = true;
    } else {
        placeBee();
    }
}

function gameOver() {
    isGameOver = true;
    console.log('game over man, game over')
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function resetGame() {
    totalFlagged = 0;
    isGameOver = false;
    setupGame();
}

function mousePressed() {
    if (!isGameOver) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    if (mouseButton == LEFT) {
                        grid[i][j].reveal();

                        if (grid[i][j].bee) {
                            gameOver();
                        } 
                    } else if (mouseButton == RIGHT && !grid[i][j].revealed && !isGameOver) {
                        grid[i][j].toggleFlag();
                        if (grid[i][j].flagged) {
                            totalFlagged++;
                        } else {
                            totalFlagged--;
                        }
                    }
                }
            }
        }
    }
}

function winGame() {
    isGameOver = true;
    console.log('YOU WIN EH?');
    progString.html('You Win!!! The bees are free!');
}

function draw() {
    background(255);

    if (!isGameOver) {
        progString.html('Bees: ' + totalFlagged + '\\' + totalBees);
    }

    totalRevealed = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
            if (grid[i][j].revealed) {
                totalRevealed++;
            }
        }
    }

    if (totalFlagged + totalRevealed == cols * rows && !isGameOver) {
        winGame();
    }
}