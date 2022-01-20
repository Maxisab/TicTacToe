const player1 = {
    name: "Player 1",
    color: "rgb(255,97,95)",
    turn: true,
    marker: "X",
    markerImg: "/images/X.png",
    placeMarker(target){
        const marker = document.createElement('img')
        marker.setAttribute('src', this.markerImg)
        marker.setAttribute('alt', this.marker)
        target.classList.add('X')
        target.append(marker)
    }
}

const player2 = {
    name: "Player 2",
    color: "rgb(62,197,243)",
    turn: false,
    marker: "O",
    markerImg: "/images/O.png",
    placeMarker(target){
        const marker = document.createElement('img')
        marker.setAttribute('src', this.markerImg)
        marker.setAttribute('alt', this.marker)
        target.classList.add('O')
        target.append(marker)
    }
}

const game = {
    checkTurn(){
        if(player1.turn) {
            return player1
        } else {
            return player2
        }
            
    },
    switchTurn(){
        //the "?" operator checks if statement is true then executes first command, else executes second command
        player1.turn ? player1.turn = false : player1.turn = true;
        player2.turn ? player2.turn = false : player2.turn = true;
    }
}

function validTarget(target) {
    if(target.classList.contains('cell')){
        return true
    }
};

const grid = document.querySelector(".grid")
const body = document.querySelector("body")
const playerDisplay = document.createElement('h2')
let currentPlayer = game.checkTurn()

function playGame(e) {
    if(!validTarget(e.target)) return false

    //allows placement of current players marker and then switches turn to other player
    currentPlayer.placeMarker(e.target);
    game.switchTurn();

    //re-assign current player value for the currentPlayer variable
    currentPlayer = game.checkTurn();
    playerDisplay.innerText = currentPlayer.name
    playerDisplay.style.color = currentPlayer.color

    checkWinner()
}

function startGame() {
    let name1 = window.prompt("Enter player 1's name", 'Player 1')
    let name2 = window.prompt("Enter player 2's name", 'Player 2')
    
    player1.name = name1.toUpperCase()
    player2.name = name2.toUpperCase()

    //removes event listener from start game button so it wont repeat
    startBtn.removeEventListener('click', startGame)
    //variable assigned as current player through checkTurn and then displayed at game start
    playerDisplay.innerText = currentPlayer.name
    playerDisplay.style.color = currentPlayer.color
    body.insertBefore(playerDisplay, grid)

    //event listenter for clicking on the grid and target a cell inside the grid
    grid.addEventListener("click", playGame)
}

const startBtn = document.querySelector('button')
startBtn.addEventListener('click', startGame)

const cells = []

//creates array of all 9 cells
for(let i = 1; i <= 9; i++){
    cells.push(document.querySelector(`#\\3${i}`))  
}

//array containing arrays of all possible winning combinations
const winCon = [[cells[0],cells[1],cells[2]],
    [cells[3],cells[4],cells[5]],
    [cells[6],cells[7],cells[8]],
    [cells[0],cells[3],cells[6]],
    [cells[1],cells[4],cells[7]],
    [cells[2],cells[5],cells[8]],
    [cells[0],cells[4],cells[8]],
    [cells[2],cells[4],cells[6]],]

// console.log(winCon)
function restartGame() {
    location.reload()
}

function checkWinner() {
    const winBanner = document.querySelector('.winner')
    //loops through winCon array
    for(let i = 0; i < winCon.length; i++){
        //checks each array within the winCon array to see if either player has won
        if(winCon[i].every(cell => {
            return cell.classList.contains('X')
           })) {
            winBanner.innerText = player1.name + " wins!"
            winBanner.style.color = player1.color
            winBanner.style.border = `solid ${player1.color} 5px`
            winBanner.classList.remove('hidden')
            grid.removeEventListener('click', playGame)
            startBtn.innerText = "Restart"
            startBtn.addEventListener('click', restartGame)
        } else if(winCon[i].every(cell => {
            return cell.classList.contains('O')
           })) {
            winBanner.innerText = player2.name + " wins!"   
            winBanner.style.color = player2.color
            winBanner.style.border = `solid ${player2.color} 5px`
            winBanner.classList.remove('hidden')
            grid.removeEventListener('click', playGame)
            startBtn.innerText = "Restart"
            startBtn.addEventListener('click', restartGame)
        }
    }
}