import Grid from "./javascript/Grid.js";

const gameContainer = document.querySelector('.game');
const resultDisplay = document.getElementById('result');
const startBtn      = document.getElementById('start-button');
const instructions  = document.querySelector('.instructions')
const gameMsg       = document.getElementById('game-msg');
let gameWidth = 4
let result = 0

// Add 16 div to the game div
// for (let i = 0; i < 16; i++) {
//   const cell = document.createElement('div');
//   cell.classList.add('cell');
//   gameContainer.appendChild(cell);
// }

// const tile = document.createElement('div');
// tile.classList.add('tile');
// tile.innerHTML = 2
// gameContainer.appendChild(tile);


const grid = new Grid(gameContainer)