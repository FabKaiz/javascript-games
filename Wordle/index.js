const gameContainer     = document.querySelector('.game');
const keyboardContainer = document.querySelector('.keyboard');


const wordle = 'SUPER'

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
  if (key == '⌫') {
    removeLetter()
    return
  }
  if (key === 'ENTER') {
    // TODO
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