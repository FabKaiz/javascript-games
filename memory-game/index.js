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
  },  {
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
  }
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('#grid')

const flipCard = (e) => {
  const cardId = e.target.dataset.id;
  cardArray[cardId]
  console.log(cardArray[cardId].name);
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

// function flipCard() {
//   console.log(this.getAttribute('data-id'));
// console.log('clicked');
// }


