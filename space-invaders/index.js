const gameContainer = document.querySelector('.game');
const resultDisplay = document.getElementById('result');
const startBtn      = document.getElementById('start-button');
let currentShooterIndex = 202
let gameWidth = 15

// Add div to the game div
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  gameContainer.appendChild(square);
}

const squares = [...document.querySelectorAll('.game div')];

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

const drawGame = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add('invader');
    
  }
}
drawGame()

squares[currentShooterIndex].classList.add('shooter');

const moveShooter = (e) => {
  squares[currentShooterIndex].classList.remove('shooter');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % gameWidth !== 0) currentShooterIndex--
      break;
    case 'ArrowRight':
      if (currentShooterIndex % gameWidth < gameWidth - 1) currentShooterIndex++
      break;
  }
  squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);
