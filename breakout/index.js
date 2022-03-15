const gameContainer = document.querySelector('.game');
const blockWidth = 100;
const blockHeight = 20;


class Block {
  //Initate every corner of the block
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

const blocks = [
  new Block(10, 270)
]

console.log(blocks);

const addBlocks = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('block');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    gameContainer.appendChild(block);
    
  }
}

addBlocks()