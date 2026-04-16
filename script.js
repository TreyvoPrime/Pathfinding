//Starting variable presets

const start = document.getElementById("starting")
const end = document.getElementById("ending")
const widthInput = document.getElementById("width")
const heightInput = document.getElementById("height")
const obstacle = document.getElementById("obstacle")
const draw = document.getElementById("draw")
//variable control
grid = []
function applier() {
    const width = Number(widthInput.value)
    const height = Number(heightInput.value)
    for (let i=0; i < width; i++) {
        let row = []
        for (let p=0; p < height; p++)
        row.push((i+1) * (p+1))
    grid.push(row)
    console.log(grid)
    }
}
//take in the width and height inputs
draw.addEventListener("click", applier)
