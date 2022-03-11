const squares  = document.querySelectorAll('.square');
const mole     = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score    = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const stopBtn  = document.querySelector('#stop-button');

let isRunning = false
let result = 0
let moleTimer = null
let moleId
let gameTimer = 30
let gameTimerId

const stopTimer = () => {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(moleTimer);
  clearInterval(gameTimerId);
  gameTimer = 30;
  timeLeft.textContent = gameTimer;
  result = 0
  score.textContent = result
};

const randomSquare = () => {
  squares.forEach(square => {
    square.classList.remove('mole');
    square.innerHTML = ''
  })

  const randomPosition = squares[Math.floor(Math.random() * squares.length)];
  randomPosition.classList.add('mole')
  randomPosition.innerHTML += '<img src="./images/mole.png" />';

  let img = document.getElementsByTagName('img')[0]
  setTimeout(() => {
    img.style.marginTop = '20px'
    
  }, 100);
  setTimeout(() => {
    img.style.marginTop = '200px'
    
  }, 700);
  moleId = randomPosition.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === moleId) {
      result++
      score.textContent = result
      square.classList.remove('mole');
      square.innerHTML = ''
    } 
  })
})

const moveTheMole = () => {
  if (isRunning) return;
  isRunning = true;
  moleTimer = setInterval(() => randomSquare(), 1000);
}

startBtn.addEventListener('click', () => {
  if (gameTimer == 0 && !isRunning) {
    window.location.reload()
  } else if (!isRunning) {
    moveTheMole()
    gameTimerId = setInterval(() => countdown(), 1000);
  }
});

function countdown() {
  if (gameTimer == 0 ) {
    clearInterval(gameTimerId);
    clearInterval(moleTimer);
    alert('GAME OVER! Your score: ' + result)
    squares.forEach(square => {
      square.classList.remove('mole');
    })
    isRunning = false;
  } else  {
    gameTimer--;
    timeLeft.textContent = gameTimer;
  }
}

stopBtn.addEventListener('click', () => stopTimer())
