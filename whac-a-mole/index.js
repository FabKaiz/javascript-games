const squares  = document.querySelectorAll('.square');
const mole     = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
console.log(timeLeft);
const score    = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');

let isRunning = false
let result = 0
let moleTimer = null
let moleId
let gameTimer = 3
let gameTimerId

const randomSquare = () => {
  squares.forEach(square => {
    square.classList.remove('mole');
  })

  const randomPosition = squares[Math.floor(Math.random() * squares.length)];
  randomPosition.classList.add('mole')
  moleId = randomPosition.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === moleId) {
      result++
      score.textContent = result
      square.classList.remove('mole');
    } 
  })
})

const moveTheMole = () => {
  if (isRunning) return;
  isRunning = true;
  moleTimer = setInterval(() => randomSquare(), 1000);
}





startBtn.addEventListener('click', () => {
  moveTheMole()
  gameTimerId = setInterval(() => countdown(), 1000);
  
  // countdown()
});

function countdown() {
  if (gameTimer == 0) {
    clearInterval(gameTimerId);
    clearInterval(moleTimer);
    alert('GAME OVER! Your score: ' + result)
    squares.forEach(square => {
      square.classList.remove('mole');
    })
  } else {
    gameTimer--;
    console.log('heelkjoikghjlikjdfkjg');
    timeLeft.textContent = gameTimer;
  }
}
