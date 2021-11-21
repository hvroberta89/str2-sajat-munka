const cards = document.querySelector(".cards"),
    flippedCounter = document.querySelector(".game__flips"),
    flippedCardCounter = document.querySelector(".game__flips span"),
    timer = document.querySelector(".game__timer");
let flippedCard=[];
let flippedNum =0;
let rigthCard=0;
let prevTime, stopTimerInterval, elapsedTime = 0;


const figureNum = 5;
const images = [
    "robo_arm", 
    "robo_brain", 
    "robo_bug", 
    "robo_dog",
    "robo_human",
    "robo_arm",
    "robo_brain",
    "robo_bug",
    "robo_dog",
    "robo_human"   
];

const randomImg= [];
for (let j=0; j<figureNum*2; j++) {
    randomImg[j]={ 
        Image: images[j],
        Nr: Math.random()*100
    };
}

randomImg.sort((a,b) => a.Nr - b.Nr);

for (let i=0; i<figureNum*2; i++) {

    let card=document.createElement('div');
    card.setAttribute("class","card");
    card.dataset.id=i;
    cards.appendChild(card);

    let frontCard=document.createElement('div');
    frontCard.setAttribute("class","front-card hide");
    card.dataset.img =randomImg[i].Image;
    card.appendChild(frontCard);

    let backCard=document.createElement('div');
    backCard.setAttribute("class","back-card show");
    card.appendChild(backCard);
    
    let frontImg=document.createElement('img');
    frontImg.src ="./images/" + randomImg[i].Image + ".png";
    frontImg.setAttribute("class","card__front");
    frontCard.appendChild(frontImg);

    let backImg=document.createElement('img');
    backImg.src ="./images/robo_back.png";
    backImg.setAttribute("class","card__back");
    backCard.appendChild(backImg);
}


const addFlip = (clickedCard) => clickedCard.classList.add('flipped');

const rightPair = (clickedCard) => setTimeout(() =>{
    clickedCard.classList.add('rightPair');
    },500);

    const removeFlip = (flippedCard) => setTimeout(() =>{
    flippedCard.classList.remove('flipped')
    },1000);

const updateTime = () => {
    let tempTime = elapsedTime;
    let milliseconds = tempTime % 1000;
    tempTime = Math.floor(tempTime / 1000);
    let seconds = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    let minutes = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);

    timer.innerHTML =minutes + " : " + seconds;
}

const startTimer = () => {
    if (!stopTimerInterval) {
        stopTimerInterval = setInterval(function () {
          if (!prevTime) {
            prevTime = Date.now();
          }
          
          elapsedTime += Date.now() - prevTime;
          prevTime = Date.now();
          
          updateTime();
        }, 50);
      }  
};

const stopTimer = () => {
    if (stopTimerInterval) {
        clearInterval(stopTimerInterval);
        stopTimerInterval = null;
      }
      prevTime = null;
};

const endGame = () => {
    stopTimer();
    timer.classList.add('pulse');
    flippedCounter.classList.add('pulse');
    setTimeout(() => {
        window.location.reload();
    },5000);
}

let running = 1;
const allCard=document.querySelectorAll(".card");
allCard.forEach(card => {
    card.addEventListener('click',function(){
        
        startTimer();
        addFlip(card);

        flippedCard.push(card.dataset.id);
        if (flippedCard.length===2) {
            const firstCard = allCard[flippedCard[0]],
                secondCard = allCard[flippedCard[1]];

            if (firstCard.dataset.img===secondCard.dataset.img) {
                rightPair(firstCard);
                rightPair(secondCard);

                rigthCard+=2;
                
                running= (allCard.length===rigthCard ? endGame() : 1);
                
                
            } else {
                removeFlip(firstCard);
                removeFlip(secondCard);
            };
            flippedCard=[];
        };

        flippedNum++;
        flippedCardCounter.innerHTML=flippedNum;
});
})

