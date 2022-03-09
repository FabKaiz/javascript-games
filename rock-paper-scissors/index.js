const computerChoice = document.getElementById('computer-choice')
const userChoice     = document.getElementById('user-choice')
const choices        = document.querySelectorAll('button')
const result         = document.getElementById('result')



getResults = () => {
  if (computerChoice.innerText === userChoice.innerText) {
    result.innerText = 'DRAW'
  }
  if (computerChoice.innerText === 'SCISSORS' && userChoice.innerText === 'ROCK') {
    result.innerText = 'You win!'
  }
  if (computerChoice.innerText === 'ROCK' && userChoice.innerText === 'PAPER') {
    result.innerText = 'You win!'
  }
  if (computerChoice.innerText === 'PAPER' && userChoice.innerText === 'SCISSORS') {
    result.innerText = 'You win!'
  }
  if (computerChoice.innerText === 'SCISSORS' && userChoice.innerText === 'PAPER') {
    result.innerText = 'You lose!'
  }
  if (computerChoice.innerText === 'ROCK' && userChoice.innerText === 'SCISSORS') {
    result.innerText = 'You lose!'
  }
  if (computerChoice.innerText === 'PAPER' && userChoice.innerText === 'ROCK') {
    result.innerText = 'You lose!'
  }
}

getTheComputerChoice = () => {
  const randNumber = Math.floor(Math.random() * 3)
  if (randNumber === 0) {
    computerChoice.innerText = 'Rock'
  } else if (randNumber === 1) {
    computerChoice.innerText = 'Paper'
  } else if (randNumber === 2) {
    computerChoice.innerText = 'Scissors'
  }
  getResults()
}

choices.forEach(choice => choice.addEventListener('click', (e) => {
  console.log(e.target.innerText);
  userChoice.innerText = e.target.innerText
  getTheComputerChoice()
}))