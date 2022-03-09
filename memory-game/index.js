const cardArray = [
  {
    name: 'fries',
    img: './images/fries.jpg',
  },
  {
    name: 'cheeseburger',
    img: './images/cheeseburger.jpg',
  },
  {
    name: 'hotdog',
    img: './images/hotdog.jpg',
  },
  {
    name: 'ice-cream',
    img: './images/ice-cream.jpg',
  },
  {
    name: 'milkshake',
    img: './images/milkshake.jpg',
  },
  {
    name: 'pizza',
    img: './images/pizza.jpg',
  },
  {
    name: 'donut',
    img: './images/donut.jpg',
  },
  {
    name: 'sandwich',
    img: './images/sandwich.jpg',
  },
  {
    name: 'fries',
    img: './images/fries.jpg',
  },
  {
    name: 'cheeseburger',
    img: './images/cheeseburger.jpg',
  },
  {
    name: 'hotdog',
    img: './images/hotdog.jpg',
  },
  {
    name: 'ice-cream',
    img: './images/ice-cream.jpg',
  },
  {
    name: 'milkshake',
    img: './images/milkshake.jpg',
  },
  {
    name: 'pizza',
    img: './images/pizza.jpg',
  },
  {
    name: 'donut',
    img: './images/donut.jpg',
  },
  {
    name: 'sandwich',
    img: './images/sandwich.jpg',
  },
]

cardArray.sort(() => 0.5 - Math.random())

const grid           = document.querySelector('#grid')
const result         = document.querySelector('#result')
const cardsClicked   = []
const cardsClickedId = []
const cardsWon       = []

console.log(cardArray);

const checkMatch = () => {
  const allCards = document.querySelectorAll("img")
  
  if (cardsClickedId[0] !== cardsClickedId[1]) {
    if (cardsClicked[0] === cardsClicked[1]) {
      allCards[cardsClickedId[0]].style.opacity = "0";
      allCards[cardsClickedId[0]].style.visibility = "hidden";
      allCards[cardsClickedId[1]].style.opacity = "1";
      allCards[cardsClickedId[1]].style.visibility = "hidden";
      cardsWon.push(cardsClicked)
    }
  } 

  // Reset the Array and the card cover if necessary 
  setTimeout(() => {
    allCards[cardsClickedId[0]].setAttribute("src", "images/blank.jpg");
    allCards[cardsClickedId[1]].setAttribute("src", "images/blank.jpg");
    cardsClicked.splice(0, cardsClicked.length);
    cardsClickedId.splice(0, cardsClickedId.length);
  }, 200);

  result.innerHTML = cardsWon.length

  // Handle win
  if (cardsWon.length === cardArray.length / 2) {
    document.querySelector('h3').innerText= 'Congratulations, you win !!!'
    const winButton = document.createElement('button');
    winButton.innerHTML = 'Restart'
    document.getElementById('restart').appendChild(winButton)
    winButton.onclick = () => window.location.reload()
  }
};

const flipCard = (e) => {
  const cardId = e.target.dataset.id;
  e.target.setAttribute('src',cardArray[cardId].img )
  cardsClicked.push(cardArray[cardId].name)
  cardsClickedId.push(cardId)

  if (cardsClicked.length === 2) {
    setTimeout(() => {
      checkMatch()
    }, 300);
  }
}

const createGrid = () => {
  for (const element in cardArray) {
    const card = document.createElement('img');
    card.setAttribute('src', './images/blank.jpg');
    card.setAttribute('data-id', element)
    card.addEventListener('click', flipCard)
    grid.appendChild(card);
  }
}
createGrid()
