const  cellElements = document.querySelectorAll('[data-cell]');
const  board = document.getElementById('board');
const winningTextElement = document.querySelector('[game-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartbutton = document.getElementById('restartButton');
const inPlayeStartButton = document.getElementById('inPlayeStartButton');

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0, 4,8],
    [2,4,6]
];


const x_class = 'x'
const circle_class = 'circle'

let circleTurn 

startGame();
restartbutton.addEventListener('click', startGame);
inPlayeStartButton.addEventListener('click', startGame); 

function startGame(){
    inPlayeStartButton.style.display = "block";
    let circleTurn = false
    winningMessageElement.classList.remove('show')
cellElements.forEach(cell =>{
    setBoardHoverclass()
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once:true})
})
};




function handleClick(e){
    console.log('clicked')
    cell = e.target
    const currentClass = circleTurn? circle_class: x_class;
    // place the mark
    // check for win
    // check for draw
    // switch Turns

    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        console.log('winner');
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
         swapTurns()
    setBoardHoverclass()
    }
};

function endGame(draw){
    if(draw){
        winningTextElement.innerText = 'Draw!'
    } else{
       winningTextElement.innerText = `${circleTurn ? "0's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
    inPlayeStartButton.style.display = "none";
    
};

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
};

// THIS FUNCTION INSERTS A CLASS OF EITHER "x" or "circle" into the cell
function placeMark( cell, currentClass){
    cell.classList.add(currentClass)
};


function swapTurns(){
    circleTurn = !circleTurn
};

function setBoardHoverclass(){
    //remove the classes from the cells
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if(circleTurn){
        board.classList.add(circle_class)
    } else {
        board.classList.add(x_class)
    }
};


function checkWin(currentClass){
    return winningCombinations.some(combination =>{
        return combination.every( index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
};