const maze = document.getElementById("maze");
const rows = 10;
const cols = 10;
const cells = [];

// Create maze grid
for (let row = 0; row < rows; row++) {
    cells[row] = [];
    for (let col = 0; col < cols; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    maze.appendChild(cell);
    cells[row][col] = cell;
}
}

// Recursive maze generation (Recursive Backtracking)
function generateMaze(row, col) {
cells[row][col].classList.remove("wall");

const directions = shuffleDirections();
for (const direction of directions) {
    const [nextRow, nextCol] = getNeighbor(row, col, direction);
    if (isValid(nextRow, nextCol) && cells[nextRow][nextCol].classList.contains("wall")) {
    cells[(row + nextRow) / 2][(col + nextCol) / 2].classList.remove("wall");
    generateMaze(nextRow, nextCol);
    }
}
}
function addObstacles() {
    const numObstacles = Math.floor((rows * cols) / 4); 
    for (let i = 0; i < numObstacles; i++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
    cells[randomRow][randomCol].classList.add("wall");
    }
}
addObstacles();

function shuffleDirections() {
const directions = ["up", "right", "down", "left"];
for (let i = directions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [directions[i], directions[j]] = [directions[j], directions[i]];
}
return directions;
}

function getNeighbor(row, col, direction) {
    switch (direction) {
    case "up":
    return [row - 2, col];
    case "right":
    return [row, col + 2];
    case "down":
    return [row + 2, col];
    case "left":
    return [row, col - 2];
}
}

function isValid(row, col) {
return row >= 0 && row < rows && col >= 0 && col < cols;
}

generateMaze(0, 0);

function solveMaze(row, col) {
if (row < 0 || col < 0 || row >= rows || col >= cols || cells[row][col].classList.contains("wall") || cells[row][col].classList.contains("path")) {
    return false;
}

cells[row][col].classList.add("path");

if (row === rows - 1 && col === cols - 1) {
    return true;
}

if (solveMaze(row - 1, col) || solveMaze(row, col + 1) || solveMaze(row + 1, col) || solveMaze(row, col - 1)) {
    return true;
}

cells[row][col].classList.remove("path");
return false;
}

setTimeout(() => {
solveMaze(0, 0);
}, 1000); 
