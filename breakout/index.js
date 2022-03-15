const gameContainer = document.querySelector('.game');
const scoreDisplay = document.querySelector('.score')
const blockWidth = 80;
const blockHeight = 20;
const borderWidth = 640;
const borderHeight = 300;
const ballDiameter = 10;
let timerId
let xDirection = 2;
let yDirection = 2;
let score = 0;

const userStartPosition = [280, 10]
let currentPosition = userStartPosition

const ballStartPosition = [315, 40]
let ballCurrentPosition = ballStartPosition

class Block {
  //Initate every corner of the block
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

const blocks = [
  new Block(10, 270),
  new Block(100, 270),
  new Block(190, 270),
  new Block(280, 270),
  new Block(370, 270),
  new Block(460, 270),
  new Block(550, 270),

  new Block(10, 240),
  new Block(100, 240),
  new Block(190, 240),
  new Block(280, 240),
  new Block(370, 240),
  new Block(460, 240),
  new Block(550, 240),

  new Block(10, 210),
  new Block(100, 210),
  new Block(190, 210),
  new Block(280, 210),
  new Block(370, 210),
  new Block(460, 210),
  new Block(550, 210),
]

const addBlocks = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    gameContainer.appendChild(block);
    
  }
}
addBlocks()


// draw the user bar
const drawUserBar = () => {
  userBar.style.left = currentPosition[0] + 'px'
  userBar.style.bottom = currentPosition[1] + 'px'
}


// draw the ball
const drawBall = () => {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}


// Add the user bar
const userBar = document.createElement('div');
userBar.classList.add('userBar');
drawUserBar()
gameContainer.appendChild(userBar);


// Move the user bar
const moveUserBar = (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUserBar()
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < borderWidth - blockWidth) {
        currentPosition[0] += 10
        drawUserBar()
      }
      break;
  }
}


// Add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
gameContainer.appendChild(ball);


// Move balll
const moveBall = () => {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkCollisions()

}

timerId = setInterval(moveBall, 30);

const changeDirection = () => {

  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }

}

// Check for collisions
const checkCollisions = () => {
  // Check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
      (ballCurrentPosition[1] + ballDiameter) < blocks[i].topLeft[1]
    ) {
      const allBlocks = [...document.querySelectorAll('.block')];

      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
      score++
      scoreDisplay.innerHTML = score

      // Check for the win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'YOU WIN!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUserBar)
      }
    }
    
  }
  
  // Check for wall collisions
  if (
    ballCurrentPosition[0] >= borderWidth - ballDiameter ||
    ballCurrentPosition[1] >= borderHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0 
  ) {
    changeDirection();
  }

  //Check for user bar collision
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection()
  }

  // Check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = "Game over !"
    document.removeEventListener('keydown', moveUserBar)
  }
}



document.addEventListener('keydown', moveUserBar)