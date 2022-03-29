const gameContainer     = document.querySelector('.game');
const keyboardContainer = document.querySelector('.keyboard');

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

guessRows.forEach((row, rowIndex) => {
  // Create a new div for each row
  const rowElement = document.createElement('div')
  rowElement.setAttribute('id', 'row-' + (rowIndex + 1))
  row.forEach((guess, guessIndex) => {
    // Create div for each tile in the row
    const tileElement = document.createElement('div');
    tileElement.setAttribute('class', 'tile');
    tileElement.setAttribute('id', 'row-' + (rowIndex + 1) + '-' + 'tile-' + (guessIndex + 1))
    rowElement.append(tileElement);
  })

  gameContainer.appendChild(rowElement)
})

const handleClick = () => {
  console.log('clicked');
}

keys.forEach(key => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key 
  buttonElement.setAttribute('id', key)
  buttonElement.addEventListener('click', handleClick)
  keyboardContainer.append(buttonElement)
})

