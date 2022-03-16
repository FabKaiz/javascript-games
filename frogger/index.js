const timeLeftDisplay   = document.getElementById('time-left');
const resultLeftDisplay = document.getElementById('result');
const startBtn          = document.getElementById('start-button');
const squares           = document.querySelectorAll('.game div');
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

document.addEventListener('keyup', moveFrog);