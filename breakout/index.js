const gameContainer = document.querySelector(".game");
const scoreDisplay = document.querySelector(".score");
const startBtn = document.getElementById("start-button");
const instructions = document.querySelector(".info");
const blockWidth = 80;
const blockHeight = 20;
const borderWidth = 640;
const borderHeight = 300;
const ballDiameter = 10;
let ball;
let userBar;
let timerId;
let xDirection = 2;
let yDirection = 2;
let score = 0;
let hasRunned = false;

const userStartPosition = [280, 10];
let currentPosition = userStartPosition;

const ballStartPosition = [315, 40];
let ballCurrentPosition = ballStartPosition;

class Block {
  //Initate every corner of the block
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

let blocks = [
  // First row
  new Block(10, 270),
  new Block(100, 270),
  new Block(190, 270),
  new Block(280, 270),
  new Block(370, 270),
  new Block(460, 270),
  new Block(550, 270),

  // Second row
  new Block(10, 240),
  new Block(100, 240),
  new Block(190, 240),
  new Block(280, 240),
  new Block(370, 240),
  new Block(460, 240),
  new Block(550, 240),

  // Third row
  new Block(10, 210),
  new Block(100, 210),
  new Block(190, 210),
  new Block(280, 210),
  new Block(370, 210),
  new Block(460, 210),
  new Block(550, 210),
];

// draw the user bar
const drawUserBar = (userBar) => {
  userBar.style.left = currentPosition[0] + "px";
  userBar.style.bottom = currentPosition[1] + "px";
};

// draw the ball
const drawBall = (ball) => {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
};

const addBlocks = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.opacity = 0;
    setTimeout(() => (block.style.opacity = 1), 100);
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    gameContainer.appendChild(block);
  }
};

// Add the user bar
function addUserBar() {
  userBar = document.createElement("div");
  userBar.classList.add("userBar");
  drawUserBar(userBar);
  gameContainer.appendChild(userBar);
}

// Add ball
function addBall() {
  ball = document.createElement("div");
  ball.classList.add("ball");
  drawBall(ball);
  gameContainer.appendChild(ball);
}

// Move the user bar
const moveUserBar = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUserBar(userBar);
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < borderWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUserBar(userBar);
      }
      break;
  }
};

// Move balll
const moveBall = () => {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall(ball);
  checkCollisions();
};

const changeDirection = () => {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
};

// Check for collisions
const checkCollisions = () => {
  // Check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballDiameter < blocks[i].topLeft[1]
    ) {
      const allBlocks = [...document.querySelectorAll(".block")];

      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = "Score : " + score;

      // Check for the win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "YOU WIN!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUserBar);
        instructions.style.opacity = 1;
        instructions.style.top = "330px";
        instructions.innerHTML = "You win!";
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
    changeDirection();
  }

  // Check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "Game over !";
    document.removeEventListener("keydown", moveUserBar);
    instructions.style.opacity = 1;
    instructions.style.top = "350px";
    instructions.innerHTML = "GAME OVER";
  }
};

const startGame = () => {
  startBtn.innerText = "Restart";

  if (hasRunned) {
    clearInterval(timerId);
    addUserBar();

    // Reset data and positioning
    currentPosition = [280, 10];
    ballCurrentPosition = [315, 40];
    xDirection = 2;
    yDirection = 2;
    score = 0;
    scoreDisplay.innerHTML = "Score : 0";

    gameContainer.innerHTML = "";
    blocks = [
      // First row
      new Block(10, 270),
      new Block(100, 270),
      new Block(190, 270),
      new Block(280, 270),
      new Block(370, 270),
      new Block(460, 270),
      new Block(550, 270),

      // Second row
      new Block(10, 240),
      new Block(100, 240),
      new Block(190, 240),
      new Block(280, 240),
      new Block(370, 240),
      new Block(460, 240),
      new Block(550, 240),

      // Third row
      new Block(10, 210),
      new Block(100, 210),
      new Block(190, 210),
      new Block(280, 210),
      new Block(370, 210),
      new Block(460, 210),
      new Block(550, 210),
    ];
    document.addEventListener("keydown", moveUserBar);
  }

  instructions.style.opacity = 0;

  setTimeout(() => {
    gameContainer.innerHTML = "";
    addUserBar();

    addBlocks();
    addBall();

    timerId = setInterval(moveBall, 30);
  }, 100);

  hasRunned = true;
};
addUserBar();

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", moveUserBar);
