const timeLeftDisplay   = document.getElementById('time-left');
const resultLeftDisplay = document.getElementById('result');
const startBtn          = document.getElementById('start-button');
const squares           = document.querySelectorAll('.game div');
const logsLeft          = document.querySelectorAll('.log-left');
const logsRight         = document.querySelectorAll('.log-right');
const gameBlockWidth = 9

let currentIndex = 76;

const moveFrog = (e) => {
  squares[currentIndex].classList.remove('frog');

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
  squares[currentIndex].classList.add('frog')
}

const autoMoveLogs = () => {
  logsLeft.forEach(logleft => moveLogLeft(logleft))
  logsRight.forEach(logRight => moveLogRight(logRight))
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

setInterval(autoMoveLogs, 1000);

document.addEventListener('keyup', moveFrog);