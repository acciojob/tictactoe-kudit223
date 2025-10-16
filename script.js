//your JS code here. If required.

let submitbtn = document.querySelector('#submit');
let board = document.querySelector('#crossGrid');

let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');

let message = document.querySelector('.message');

let cells;

let isGameRunning=false;

let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer="x";

submitbtn.addEventListener('click', () => {

    let player1Name = player1.value;
    let player2Name = player1.value;
    if (player1Name != "" && player2Name != "") {

        board.style.display = "grid";
        cells = document.querySelectorAll(".cell");

        let form = document.querySelector('form');
        form.style.display = "none";

        message.style.display = "block";
        message.textContent = `${player1Name}, you're up`;

        initializeGame();
    }


});

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    isGameRunning=true;
}

function cellClicked() {
    let cellIndex=this.getAttribute("cellIndex");

    if(options[cellIndex]!="")
    return;

    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index){
    if(isGameRunning){
        options[index]=currentPlayer;
    cell.textContent=currentPlayer;
    }
     
}

function changePlayer(){
    currentPlayer=currentPlayer=="x"?"o":"x";
	let currentPlayerName;
	currentPlayerName= (currentPlayer=="x")?player1.value:player2.value;
	message.textContent=`${currentPlayerName}, you're up`;
	
}

function checkWinner(){
    let roundWin=false;

    for(let i=0;i<winConditions.length;i++){
        let conditions=winConditions[i];
        let cellA=options[conditions[0]];
        let cellB=options[conditions[1]];
        let cellC=options[conditions[2]];

        if(cellA==""||cellB==""||cellC=="")
        continue;
        
        if(cellA==cellB&&cellB==cellC)
        {
            roundWin=true;
            break;
        }
    }

    if(roundWin){
        let winnerName=(currentPlayer=="x")?player1.value:player2.value;
        message.textContent=`${winnerName} congratulations you won!`;
        isGameRunning=false;
    }
    else if(!options.includes(""))
    {
        message.textContent="Draw";
    }
    else{
        changePlayer();
    }
}