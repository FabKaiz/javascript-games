
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
  #cells

  constructor(gridElement) {
    gridElement.style.setProperty('--grid-size', GRID_SIZE);
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
    this.#cells = createCellElement(gridElement).map((cellElement, index) => {
      return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
    })
  }
}

class Cell {
  #cellElement
  #x
  #y

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }
}

const createCellElement = (gridElement) => {
  const cells = []
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    gridElement.appendChild(cell);
  }
  return cells
}