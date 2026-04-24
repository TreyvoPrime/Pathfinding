//Starting variable presets
const start = document.getElementById("starting")
const end = document.getElementById("ending")
const widthInput = document.getElementById("width")
const heightInput = document.getElementById("height")
const obstacle = document.getElementById("obstacle")
const draw = document.getElementById("draw")
const gridTable = document.getElementById("grid");
const reset_button = document.getElementById("reset")
const bfs_start = document.querySelector("#start");
let starting_blocks_added = 0;
let ending_blocks_added = 0;
let obstacleCount = 0;
let startPos = null;
let endPos = null;
let obstacles = [];
let grid = [];
let gridData = [];
//create grid
function gridMaker() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    if (isNaN(width) || isNaN(height)) {
        alert("Width and Height must be numbers");
        return;
    }

    gridData.length = 0;
    gridTable.innerHTML = "";

    for (let y = 0; y < height; y++) {
        let row = [];
        let tr = document.createElement("tr");

        for (let x = 0; x < width; x++) {
            let td = document.createElement("td");

            td.id = `cell-${x}-${y}`;
            td.textContent = `${x}, ${y}`;
            td.dataset.x = x;
            td.dataset.y = y;

            tr.appendChild(td);
            row.push(`${x}, ${y}`);
        }

        gridData.push(row);
        gridTable.appendChild(tr);
    }

    grid = gridData;
}
//staring block class to detect where the starting block was place 
starting_block_mode = false;
ending_block_mode = false;
obstacle_place_mode = false;
class StartingBlock {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    getCoordinates() {
        return `(${this.x}, ${this.y})`;
    }
}
class EndingBlock {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    getCoordinates() {
        return `(${this.x}, ${this.y})`;
    }
}
class ObstaclePlacer {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
//starting button selected so its in the right mode
start.addEventListener("click", function () {
    starting_block_mode = true; 
    console.log(starting_block_mode)
});
//ending button selected so its in the correct mode
end.addEventListener("click", function () {
    ending_block_mode = true;
    console.log(ending_block_mode)
});
obstacle.addEventListener("click", function () {
    obstacle_place_mode = true;
    console.log(obstacle_place_mode)

});

//take in the width and height inputs and call the gridMaker function
draw.addEventListener("click", gridMaker)


//detect the cell that was selected for startingBlock andEndingBlock
function handleCellClick(event) {
    const cell = event.target.closest("td");
    if (!cell || !grid.length) return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    if (isNaN(x) || isNaN(y) || x >= grid[0]?.length || y >= grid.length) return;

    if (starting_block_mode && !startPos) {
        cell.style.backgroundColor = "blue";
        startPos = { x, y };
        console.log("Start placed at:", x, y, grid[y][x]);
        starting_blocks_added = 1;
        starting_block_mode = false;

    } else if (ending_block_mode && !endPos) {
        cell.style.backgroundColor = "brown";
        endPos = { x, y };
        console.log("End placed at:", x, y);
        ending_blocks_added = 1;
        ending_block_mode = false;
    } else if (obstacle_place_mode) {
        cell.style.backgroundColor = "pink";
        cell.style.backgroundColor = "pink";
        obstacles.push({ x, y });
        console.log("Obstacle at:", x, y);
        obstacle_place_mode = false;
    }
}

gridTable.addEventListener("click", handleCellClick);
reset_button.addEventListener("click", function () {
    starting_blocks_added = 0;
    ending_blocks_added = 0;
    obstacleCount = 0;
    startPos = null;
    endPos = null;
    obstacles = [];
    starting_block_mode = false;
    ending_block_mode = false;
    obstacle_place_mode = false;
    grid = [];
    widthInput.value = "";
    heightInput.value = "";

    const cells = gridTable.querySelectorAll("td");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });

    gridTable.innerHTML = "";
});
//bfs algorithm function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function bfs(gridData, startPos, endPos) {
    const rows = gridData.length;
    const cols = gridData[0].length;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const previous = Array.from({ length: rows }, () => Array(cols).fill(null));

    const queue = [];
    visited[startPos.y][startPos.x] = true;
    queue.push(startPos);

    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    while (queue.length > 0) {
        const { y, x } = queue.shift();

        if (y === endPos.y && x === endPos.x) {
            break;
        }

        for (const [dy, dx] of dirs) {
            const ny = y + dy;
            const nx = x + dx;

            if (
                ny >= 0 && ny < rows &&
                nx >= 0 && nx < cols &&
                !visited[ny][nx]
            ) {
                visited[ny][nx] = true;
                previous[ny][nx] = { y, x };
                queue.push({ y: ny, x: nx });
            }
        }
    }

    let current = endPos;

    while (current) {
        const { y, x } = current;

        if (!(y === startPos.y && x === startPos.x) && !(y === endPos.y && x === endPos.x)) {
            colorCell(y, x, "yellow");
            await sleep(100);
        }

        current = previous[y][x];
    }
}
bfs_start.addEventListener("click", () => {

    bfs(gridData, startPos, endPos);
});
function colorCell(y, x, color) {
    const cell = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);

    if (cell) {
        cell.style.setProperty("background-color", color, "important");
    } else {
        console.log("Missing cell:", x, y);
    }
}
