const gameContainer     = document.querySelector('.game');
const keyboardContainer = document.querySelector('.keyboard');
const messageDisplay    = document.querySelector('.message-container');
const restartBtn        = document.getElementById('restart-btn');

import wordList from './wordList.js'

let wordle

// Take a random word from an array of 2315 words!
const randomWord = wordList.wordList[Math.floor(Math.random()*wordList.wordList.length)];
wordle = randomWord.toUpperCase()

// Generate random word with Random Words API, for local use only
// Use your API key and 'npm start:backend'
// API url: https://rapidapi.com/sheharyar566/api/random-words5
const getWordle = () => {
  fetch('http://localhost:8000/word')
    .then(response => response.json())
    .then(json => {
      wordle = json.toUpperCase();
    })
    .catch(err => console.log(err));
}

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '⌫',
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((row, rowIndex) => {
  // Create a new div for each row
  const rowElement = document.createElement('div')
  rowElement.setAttribute('id', 'row-' + rowIndex )
  row.forEach((guess, guessIndex) => {
    // Create div for each tile in the row
    const tileElement = document.createElement('div');
    tileElement.setAttribute('class', 'tile');
    tileElement.setAttribute('id', 'row-' + rowIndex + '-' + 'tile-' + guessIndex)
    rowElement.append(tileElement);
  })

  gameContainer.appendChild(rowElement)
})

keys.forEach(key => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key 
  buttonElement.setAttribute('id', key)
  buttonElement.addEventListener('click', () => handleClick(key))
  keyboardContainer.append(buttonElement)
})

const handleClick = (key) => {
  if (key == '⌫' && !isGameOver) {
    removeLetter()
    return
  }
  if (key === 'ENTER' && !isGameOver) {
    checkRow()
    return
  }
  addLetter(key)
}

const removeLetter = (key) => {
  if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
  }
}

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
  }
}

const checkRow = () => {
  const guess = guessRows[currentRow].join('')
  if (currentTile > 4) {
    flipTile()
    // Show win message
    if (wordle == guess) {
      showMessage('Well done!')
      isGameOver = true
      return
    } else {
      // If user is on the last row and didn't guess correctly => Game over
      if (currentRow >= 5) {
        isGameOver = true
        showMessage('Game over! The wordle was ' + wordle)
        return
      }
      // Go to the next row if possible
      if (currentRow < 5) {
        currentRow++
        currentTile = 0
      }
    }
  }
}

const showMessage = (message) => {
  const messageElement = document.createElement('p')
  messageElement.innerHTML = message
  // Add custom color if game over
  if (message === 'Game over! The wordle was ' + wordle) {
    messageElement.style.backgroundColor = 'rgb(52 15 26)'
    messageElement.style.fontWeight = 'bold'
  }
  messageDisplay.append(messageElement)
  restartBtn.style.visibility = 'visible'
  restartBtn.style.opacity = '1'
}

const addColorToKey = (keyLetter, className) => {
  const key = document.getElementById(keyLetter)
  key.classList.add(className);
}

const flipTile = () => {
  const rowTiles = document.querySelector('#row-' + currentRow).childNodes
  let checkWordle = wordle;
  const guess = []

  // Add each tile of the checked row to the guess array
  rowTiles.forEach(tile => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
  })

  // Add the green overlay if it's the correct index
  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = 'green-overlay';
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  // Add the yellow overlay if the letter exist in the wordle
  guess.forEach((guess, index) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  // Animate the row
  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      // Add the fliping effect to the current tile
      tile.classList.add('flip')
      setTimeout(() => {
        // Add colors to each tile of the checked row before the end of the flip animation
        tile.classList.add(guess[index].color)
        addColorToKey(guess[index].letter, guess[index].color)
      }, 200);
    }, 250 * index)
  })
}
