const timeLeftDisplay   = document.getElementById('time-left');
const resultLeftDisplay = document.getElementById('result');
const startBtn          = document.getElementById('start-button');
const squares           = document.querySelectorAll('.game div');
const logsLeft          = document.querySelectorAll('.log-left');
const logsRight         = document.querySelectorAll('.log-right');
const carsLeft          = document.querySelectorAll('.car-left');
const carsRight         = document.querySelectorAll('.car-right');
const gameBlockWidth = 9

let currentIndex = 76;

const moveFrog = (e) => {
  squares[currentIndex].classList.remove('frog');
  squares[currentIndex].classList.remove('frog-log');
  squares[currentIndex].classList.remove('frog-rotated')

  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % gameBlockWidth !== 0) currentIndex--;
      break;
    case 'ArrowRight':
      if (currentIndex % gameBlockWidth < gameBlockWidth - 1) currentIndex++;
      break;
    case 'ArrowUp':
      if (currentIndex > gameBlockWidth - 1) currentIndex -= gameBlockWidth;
      break;
    case 'ArrowDown':
      if (currentIndex < squares.length - gameBlockWidth) currentIndex += gameBlockWidth;
      break;
  }

  if (
    squares[currentIndex].classList.contains("l1") ||
    squares[currentIndex].classList.contains("l2") ||
    squares[currentIndex].classList.contains("l3")
  ) {
    squares[currentIndex].classList.add('frog-log')
  } else if (squares[currentIndex].classList.contains("rotate")) {
    squares[currentIndex].classList.add('frog-rotated')
  }else {
    squares[currentIndex].classList.add('frog')
  }
}

const autoMoveObject = () => {
  logsLeft.forEach(logleft => moveLogLeft(logleft))
  logsRight.forEach(logRight => moveLogRight(logRight))
  carsLeft.forEach(carleft => moveCarLeft(carleft))
  carsRight.forEach(carRight => moveCarRight(carRight))
}

const moveLogLeft = (logleft) => {
  switch (true) {
    case logleft.classList.contains('l1') :
      logleft.classList.remove('l1')
      logleft.classList.add('l2')
      break
    case logleft.classList.contains('l2') :
      logleft.classList.remove('l2')
      logleft.classList.add('l3')
      break
    case logleft.classList.contains('l3') :
      logleft.classList.remove('l3')
      logleft.classList.add('l4')
      break
    case logleft.classList.contains('l4') :
      logleft.classList.remove('l4')
      logleft.classList.add('l5')
      break
    case logleft.classList.contains('l5') :
      logleft.classList.remove('l5')
      logleft.classList.add('l1')
      break
  }
}

const moveLogRight = (logRight) => {
  switch (true) {
    case logRight.classList.contains('l1') :
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break
    case logRight.classList.contains('l2') :
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break
    case logRight.classList.contains('l3') :
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break
    case logRight.classList.contains('l4') :
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break
    case logRight.classList.contains('l5') :
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
  }
}

const moveCarLeft = (carLeft) => {
  switch (true) {
    case carLeft.classList.contains('c1') :
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break
    case carLeft.classList.contains('c2') :
      carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
      break
    case carLeft.classList.contains('c3') :
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
  }
}

const moveCarRight = (carRight) => {
  switch (true) {
    case carRight.classList.contains('c1') :
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break
    case carRight.classList.contains('c2') :
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break
    case carRight.classList.contains('c3') :
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
  }
}

const lose = () => {

}

setInterval(autoMoveObject, 1000);

document.addEventListener('keyup', moveFrog);