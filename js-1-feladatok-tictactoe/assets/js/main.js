//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".playerX"),
selectBtnO = selectBox.querySelector(".playerO"),
gameBox = document.querySelector(".game-box"),
nextPlayer = document.querySelector(".side__box"),
allBox=document.querySelectorAll(".gameArea td"),
nextPlayerX = document.querySelector(".next-X"),
nextPlayerO = document.querySelector(".next-O"),
winnerBox=document.querySelector(".winner-box"),
winnerText=document.querySelector(".winner-box .title span"),
newGame=document.querySelector(".winner-box .newGame");

let player;
let round = 0;
let gameOver= false;
let winnerPlayer;

const boxShow=(boxName) => (boxName.classList.add("show"));
const boxHide=(boxName) => (boxName.classList.add("hide"));
const playerChange=(activePlayer,nextPlayer) => (
    nextPlayer.classList.add("show"),
    activePlayer.classList.remove("show")
);

const checkWin=(allBox,player,index)=> {
    const result = index.every( i=> allBox[i].dataset.clicked ===player);
    return result;
}

window.onload =() => {
    selectBtnX.onclick =() => {
        boxHide(selectBox);
        boxShow(gameBox);
        boxShow(nextPlayer);
        player="x";
    }
    selectBtnO.onclick =() => {
        boxHide(selectBox);
        boxShow(gameBox);
        boxShow(nextPlayer);
        player="o";        
    }
} 


allBox.forEach(box => {
    box.addEventListener('click',(event) => {
        clickedBox= event.target;

        if (clickedBox.classList.contains('col') && !clickedBox.dataset.clicked && round<9 && !gameOver){
            clickedBox.innerHTML = player;
            clickedBox.dataset.clicked = player;

            const result= [
            //row
            checkWin (allBox, player, [0,1,2]),
            checkWin (allBox, player, [3,4,5]),
            checkWin (allBox, player, [6,7,8]),

            ////col
            checkWin (allBox, player, [0,3,6]),
            checkWin (allBox, player, [1,4,7]),
            checkWin (allBox, player, [2,5,8]),

            //diagonals
            checkWin (allBox, player, [0,4,8]),
            checkWin (allBox, player, [2,4,6])
            ];

            const winner= result.some( i=> i);
            if (winner) {
                winnerPlayer=player;
                setTimeout(() =>{
                    winnerText.innerHTML=winnerPlayer;
                    boxShow(winnerBox);
            },200)
                gameOver=true;
            }
            round++;

            if (player=="o") {
                playerChange(nextPlayerX,nextPlayerO);
                player="x";
            }else{
                playerChange(nextPlayerO,nextPlayerX);
                player="o";
            }
        }else if(round === 9){
            winnerText.innerHTML="Döntetlen";
            boxShow(winnerBox);
        }
        
    });
});

newGame.onclick =() => {
    location.reload();
}
