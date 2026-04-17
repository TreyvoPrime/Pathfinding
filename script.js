//Starting variable presets

const start = document.getElementById("starting")
const end = document.getElementById("ending")
const widthInput = document.getElementById("width")
const heightInput = document.getElementById("height")
const obstacle = document.getElementById("obstacle")
const draw = document.getElementById("draw")
let grid = document.querySelector("table")
const gridTable = document.getElementById("grid"); 
//variable control
grid = []
function applier(gridX, gridY) {
    const width = Number(widthInput.value)
    const height = Number(heightInput.value)
    let gridData = [];
    gridTable.innerHTML -="";
    //generate width for grid
    for (let i=0; i < width; i++) {
        let row = []
        let tr = document.createElement("tr")
        //generate height for the grid 
        for (let p=0; p < height; p++) {
            let td = document.createElement("td")
            td.textContent = `${i}, ${p}`
            tr.appendChild(td)
            row.push(`${i}, ${p}`)

        }
        //apply grid to page
        gridData.push(row)
        gridTable.appendChild(tr)
        console.log(grid)

    }

}

//take in the width and height inputs
draw.addEventListener("click", applier)
