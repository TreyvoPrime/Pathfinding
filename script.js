//Starting variable presets

const start = document.getElementById("starting")
const end = document.getElementById("ending")
const widthInput = document.getElementById("width")
const heightInput = document.getElementById("height")
const obstacle = document.getElementById("obstacle")
const draw = document.getElementById("draw")
const gridTable = document.getElementById("grid");
const reset_button = document.getElementById("reset")
const bfs_start = document.getElementById("start")
let starting_blocks_added = 0;
let ending_blocks_added = 0;
let obstacleCount = 0;
let startPos = null;
let endPos = null;
let obstacles = [];
// Grid data globals
let grid = [];
let gridData = [];
function gridMaker() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    // Validate inputs
    if (isNaN(width) || isNaN(height)) {
        alert("Width and Height must be numbers");
        return;
    }

    // Reuse global gridData
    gridData.length = 0;  // Clear previous
    gridTable.innerHTML = "";

    for (let i = 0; i < width; i++) {
        let row = [];
        let tr = document.createElement("tr");

        for (let p = 0; p < height; p++) {
            let td = document.createElement("td");
            td.textContent = `${i}, ${p}`;
            tr.appendChild(td);
            row.push(`${i}, ${p}`);
            td.dataset.x = i
            td.dataset.y = p
        }

        gridData.push(row);
        gridTable.appendChild(tr);
    }

    grid = gridData;
    console.log(gridData);
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
    starting_block_mode = true; // Set to true when clicked
    console.log(starting_block_mode)
});
end.addEventListener("click", function () {
    ending_block_mode = true; // Set to true when clicked
    console.log(ending_block_mode)
});
obstacle.addEventListener("click", function () {
    obstacle_place_mode = true;
    console.log(obstacle_place_mode)

});

//take in the width and height inputs
draw.addEventListener("click", gridMaker)


//detect the cell that was selected for startingBlock 
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
function bfs(gridData, startPos, endPos) {
    const rows = gridData.length;
    const cols = gridData[0].length;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

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
        console.log(`Visited: (${y}, ${x})`);

        if (y === endPos.y && x === endPos.x) {
            return;
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
                queue.push({ y: ny, x: nx });
            }
        }
    }

}
function bfsVisualiser() {
    const cells = event.target.closest("td");

}
bfs_start.addEventListener("click", () => {
    if (!gridData.length) {
        return;
    }
    bfs(gridData, startPos, endPos);
});

