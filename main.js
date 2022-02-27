document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  let squares = [];
  const width = 4;
  let score = 0;

  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      let square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate()
    generate()
  }
  createBoard()
  
  //generate a new number
  function generate() {
    let calc = 0;
    for (let i=0; i < width*width; i++) {
      if (squares[i].innerHTML == 0) {
        calc++
      }
    }
    if (calc > 0 && calc <= 16) {
      randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
        checkForGameOver();
      } else {
        generate()
      }  
    }
  }

  function moveRight() {
    for (let i=0; i < 13; i+=4) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+1].innerHTML
      let totalThree = squares[i+2].innerHTML
      let totalFour = squares[i+3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = zeros.concat(filteredRow)

      squares[i].innerHTML = newRow[0]
      squares[i +1].innerHTML = newRow[1]
      squares[i +2].innerHTML = newRow[2]
      squares[i +3].innerHTML = newRow[3]
    }
  }
  function moveLeft() {
    for (let i=0; i <= 12; i+=4) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+1].innerHTML
      let totalThree = squares[i+2].innerHTML
      let totalFour = squares[i+3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = filteredRow.concat(zeros)

      squares[i].innerHTML = newRow[0]
      squares[i+1].innerHTML = newRow[1]
      squares[i+2].innerHTML = newRow[2]
      squares[i+3].innerHTML = newRow[3]
    }
  }

  function moveUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i+width].innerHTML;
      let totalThree = squares[i+(width*2)].innerHTML;
      let totalFour = squares[i+(width*3)].innerHTML;
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

      let filteredColumn = column.filter(num => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i +width].innerHTML = newColumn[1];
      squares[i+(width*2)].innerHTML = newColumn[2];
      squares[i+(width*3)].innerHTML = newColumn[3];
    }
  }

  function combineRow() {
    for (let i =0; i < 15; i++) {
      if (i != 3 && i != 7 && i != 11) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i +1].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }

  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'Você GANHOU!'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    for (let i=0; i < 15; i++) {
      if (i != 3 && i != 7 && i != 11) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {
          zeros++
        }
      }
    }
    for (let i=0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        zeros++
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'Você perdeu!'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      let color = ['#eee4da', '#8789E0', '#E0813D', '#E03160', '#54E028', '#F2D455', '#39D1B1', '#D147C8', '#70464A', '#EFB094', '#EFB0EF', '#5FD0B0'];
      let num = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
      for (let n=0; n < color.length; n++) {
        if (squares[i].innerHTML == num[n]) squares[i].style.backgroundColor = color[n];
      }
    }
  }
  addColours()
  
  var myTimer = setInterval(addColours, 50)  
})