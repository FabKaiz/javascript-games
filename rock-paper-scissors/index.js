const computerChoice = document.getElementById('computer-choice')
const userChoice     = document.getElementById('user-choice')
const choices        = document.querySelectorAll('button')
const result         = document.getElementById('result')
const choicesArray   = ['ROCK', 'PAPER', 'SCISSORS']

getResults = () => {
  if (computerChoice.innerText === userChoice.innerText) {
    result.innerText = "DRAW";
    result.style.color = 'rgb(171 171 171)'
  } else if (
    (computerChoice.innerText === "SCISSORS" && userChoice.innerText === "ROCK") ||
    (computerChoice.innerText === "ROCK" && userChoice.innerText === "PAPER") ||
    (computerChoice.innerText === "PAPER" && userChoice.innerText === "SCISSORS")
  ) {
    result.innerText = "You win!";
    result.style.color = 'rgb(0 255 114)'
  } else {
    result.innerText = "You lose!";
    result.style.color = 'rgb(255, 0, 80)'
  }
};

getTheComputerChoice = () => {
  const randChoice = choicesArray[Math.floor(Math.random() * 3)]
  computerChoice.innerText = randChoice
  getResults()
}

choices.forEach(choice => choice.addEventListener('click', (e) => {
  userChoice.innerText = e.target.closest('button').innerText
  getTheComputerChoice()
}))