import Grid from "./javascript/Grid.js";
import Tile from "./javascript/Tile.js";

const gameContainer = document.querySelector('.game');
const resultDisplay = document.getElementById('result');
const startBtn      = document.getElementById('start-button');
const instructions  = document.querySelector('.instructions')
const gameMsg       = document.getElementById('game-msg');
let result = 0

const grid = new Grid(gameContainer)
grid.randomEmptyCell().tile = new Tile(gameContainer)
grid.randomEmptyCell().tile = new Tile(gameContainer)
setupInput()
console.log(grid.cellsByColumn);

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true });
}

function handleInput(e) {
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp':
      moveUp()
      break;
    case 'ArrowDown':
      moveDown()
      break;
    case 'ArrowLeft':
      moveLeft()
      break;
    case 'ArrowRight':
      moveRight()
      break;
    default:
      setupInput()
      return;
  }
  setupInput()
}

function moveUp() {
  return slideTiles(grid.cellsByColumn)
}

function moveDown() {

}

function slideTiles(cells) {
  cells.forEach(group => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i]
      let lastValidCell
      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j];
        if (!moveToCell.canAccept(cell.tile)) break;
        lastValidCell = moveToCell;
      }

      if (lastValidCell != null) {
        if (lastValidCell.tile != null) {
          lastValidCell.mergeTile = cell.tile;
        } else {
          lastValidCell.tile = cell.tile;
        }
        cell.tile = null;
        
      }
    }
  })
}

