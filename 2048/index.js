import Grid from "./javascript/Grid.js";

const gameContainer = document.querySelector('.game');
const resultDisplay = document.getElementById('result');
const startBtn      = document.getElementById('start-button');
const instructions  = document.querySelector('.instructions')
const gameMsg       = document.getElementById('game-msg');
let result = 0

const grid = new Grid(gameContainer)
grid.randomEmptyCell().tile = new Tile(gameContainer)
grid.randomEmptyCell().tile = new Tile(gameContainer)