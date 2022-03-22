const gameContainer = document.querySelector('.game');
const resultDisplay = document.getElementById('result');
const startBtn      = document.getElementById('start-button');
const instructions  = document.querySelector('.instructions')
const gameMsg       = document.getElementById('game-msg');
let currentShooterIndex = 202
let gameWidth = 15
let direction = 1
let invadersId
let goingRight = true
let removedAliens = []
let result = 0
let asRunned = false

// Add 225 div to the game div
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  gameContainer.appendChild(square);
}


let alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

// Add class of invaders to the specified index
const drawGameInvaders = () => {
  const squares = [...document.querySelectorAll('.game div')];
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!removedAliens.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader');
    }
  }
}

// Remove all invader class from the game
const removeGameInvaders = () => {
  const squares = [...document.querySelectorAll('.game div')];
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader');
  }
}


// move shooter left or right
const moveShooter = (e) => {
  const squares = [...document.querySelectorAll('.game div')];

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


const moveInvaders = () => {
  const leftEdge = alienInvaders[0] % gameWidth === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % gameWidth === gameWidth - 1
  const squares = [...document.querySelectorAll('.game div')];

  removeGameInvaders()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += gameWidth + 1
      direction = -1
      goingRight = false
    }
  } else if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += gameWidth - 1
      direction = +1
      goingRight = true
    }
  }
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  drawGameInvaders()

  const loosingMsg = () => {
    gameMsg.innerHTML = 'GAME OVER!'
    gameMsg.style.color = 'rgb(255, 0, 80)'
    gameMsg.style.visibility = 'visible'
    gameMsg.style.opacity = '0.9'
  }

  const winningMsg = () => {
    gameMsg.innerHTML = 'YOU WIN!'
    gameMsg.style.color = 'darkseagreen'
    gameMsg.style.visibility = 'visible'
    gameMsg.style.opacity = '0.9'
  }

  // Check if invaders touch the shooter
  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultDisplay.innerHTML = 'GAME OVER!'
    clearInterval(invadersId)
    loosingMsg()
  }

  // Check if invaders touch the bottom of the screen
  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length - gameWidth) {
      resultDisplay.innerHTML = 'GAME OVER!'
      clearInterval(invadersId)
      loosingMsg()
    }
  }
  // Check for the win
  if (removedAliens.length === alienInvaders.length) {
    resultDisplay.innerHTML = 'YOU WIN!'
    clearInterval(invadersId)
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', moveShooter)
    winningMsg()
  }
}


const shoot = (e) => {
  let laserId
  let currentLaserIndex = currentShooterIndex
  const squares = [...document.querySelectorAll('.game div')];

  const moveLaser = () => {
    squares[currentLaserIndex].classList.remove('laser')
    // Check if the laser is still in the game container 
    if (currentLaserIndex >= 15) {
      currentLaserIndex -= gameWidth
      squares[currentLaserIndex].classList.add ('laser')
      // if not remove the class and stop it
    } else {
      squares[currentLaserIndex].classList.remove('laser')
      clearInterval(laserId)
    }

    // if the laser touch an invader remove class and ad it to an array
    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      clearInterval(laserId)

      const removedAlien = alienInvaders.indexOf(currentLaserIndex)
      removedAliens.push(removedAlien)
      result++;
      resultDisplay.innerHTML = 'Score : ' + result
    }
  }
  switch (e.key) {
    case ' ':
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 50);
      break;
  }
}


const startGame = () => {
  asRunned = true

  // Remove the instructions text
  instructions.style.opacity = 0
  setTimeout(() => {
    instructions.style.visibility = 'hidden'
  }, 400);

  // Remove game over / win message
  if (asRunned) {
    startBtn.innerHTML = 'Restart game'
    gameMsg.style.opacity = '0'
    setTimeout(() => gameMsg.style.visibility = 'hidden', 300);
  }

  // Reset and remove everything
  const squares = [...document.querySelectorAll('.game div')];
  squares[currentShooterIndex].classList.remove('shooter');
  clearInterval(invadersId)
  removeGameInvaders()
  result = 0
  removedAliens = []
  goingRight = true
  currentShooterIndex = 202
  direction = 1

  alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
  ]
  
  // Draw the invaders, shooter and create EventListener
  resultDisplay.innerHTML = 'Score : ' + result
  squares[currentShooterIndex].classList.add('shooter');
  drawGameInvaders()
  document.addEventListener('keydown', moveShooter);
  invadersId = setInterval(moveInvaders, 500);
  document.addEventListener('keydown', shoot)
}

// Remove button be clickable when pressing space
document.querySelectorAll("button").forEach( function(item) {
  item.addEventListener('focus', function() {
      this.blur();
  })
})

startBtn.addEventListener('click', () => startGame())

// TODO: Media queries