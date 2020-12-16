const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

function buildGrid() {
  return new Array(cols)
    .fill(null)
    .map(() =>
      new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
    );
}

let grid = buildGrid();

requestAnimationFrame(update);

function update() {
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(update);
}

function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid.length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const xCell = col + i;
          const yCell = row + j;

          if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      // Rules
      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid.length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}
