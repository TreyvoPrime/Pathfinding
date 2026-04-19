//Starting variable presets

const start = document.getElementById("starting")
const end = document.getElementById("ending")
const widthInput = document.getElementById("width")
const heightInput = document.getElementById("height")
const obstacle = document.getElementById("obstacle")
const draw = document.getElementById("draw")
let grid = document.querySelector("table")
const gridTable = document.getElementById("grid");
const starting_button = document.getElementById("starting")
const reset_button = document.getElementById("reset")
let starting_blocks_added = 0;
let ending_blocks_added = 0;
//variable control
grid = []
function gridMaker() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    // Validate inputs
    if (isNaN(width) || isNaN(height)) {
        alert("Width and Height must be numbers");
        return;
    }

    let gridData = [];
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

    console.log(gridData);
}
//staring block class to detect where the starting block was place 
starting_block_mode = false;
ending_block_mode = false;
class StartingBlock {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

}
class EndingBlock {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

}
//starting button selected so its in the right mode
start.addEventListener('click', function () {
    starting_block_mode = true; // Set to true when clicked
    console.log(starting_block_mode)
});
end.addEventListener('click', function () {
    ending_block_mode = true; // Set to true when clicked
    console.log(ending_block_mode)
});


//take in the width and height inputs
draw.addEventListener("click", gridMaker)


//detect the cell that was selected for startingBlock 
function cellSelect(event) {
    const piece_detected = event.target.closest("td, th");
    if (!piece_detected) return;

    if (starting_block_mode === true && starting_blocks_added < 1) {
        piece_detected.style.backgroundColor = "yellow";

        console.log('You clicked a row!');

        const x = Number(piece_detected.dataset.x);
        const y = Number(piece_detected.dataset.y);

        console.log("Clicked:", x, y);
        console.log(starting_block_mode);

        const StartingPosition = new StartingBlock(x, y);

        starting_blocks_added++;
        starting_block_mode = false;
    }
}

function cellSelectEnding(event) {
    const piece_detected = event.target.closest("td, th");
    if (!piece_detected) return;

    if (ending_block_mode === true && ending_blocks_added < 1) {
        piece_detected.style.backgroundColor = "brown";

        console.log('You clicked a row!');

        const x = Number(piece_detected.dataset.x);
        const y = Number(piece_detected.dataset.y);

        console.log("Clicked:", x, y);
        console.log(starting_block_mode);

        const EndingPosition = new EndingBlock(x, y);

        ending_blocks_added++;
        ending_block_mode = false;
    }
}

gridTable.addEventListener("click", cellSelect)
gridTable.addEventListener("click", cellSelectEnding)

reset_button.addEventListener("click", function () {
    starting_blocks_added = 0;
    starting_block_mode = false;
    ending_blocks_added = 0;
    ending_block_mode = false;
    widthInput.value = "";
    heightInput.value = "";

    const cells = gridTable.querySelectorAll("td");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });

    gridTable.innerHTML = "";
});


function bfs(gridData) {
    const startCell = grid[StartingPosition.x][StartingPosition.y];
    const endCell = grid[EndingPosition.x][EndingPosition.y];
}
