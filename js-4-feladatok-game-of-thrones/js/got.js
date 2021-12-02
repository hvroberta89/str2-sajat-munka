'use strict';

let characterList=[];

const sortName= (characters) => characters.sort((a, b) => {
    let x = (a.name.includes(' ')) ? a.name.split(' ')[1].toUpperCase() : a.name.toUpperCase();
    let y = (b.name.includes(' ')) ? b.name.split(' ')[1].toUpperCase() : b.name.toUpperCase();
    
    if (x > y) { 
        return 1;
    } 
    if (x<y) {
        return -1;
    }
})

const charactersBox = document.querySelector(".characters__box");
const createCharacterBox = (characters) => {
    let characterNum=0;
    characters.forEach(character => {   
        characterNum++;
        
        if (characterNum<=48) {
            let char = document.createElement('div');
            char.setAttribute('class','character');
            charactersBox.appendChild(char);

            let charImg= document.createElement('img');
            charImg.src=character.portrait;
            charImg.setAttribute("class","portrait");
            char.appendChild(charImg);     

            let name = document.createElement('div');
            name.setAttribute('class','name');
            name.innerHTML=character.name;
            char.appendChild(name);
        }            
    });
} 

let emptyInfo = true;
let prevCharacter;
const addClickListener = () => {
    let allCharacter = document.querySelectorAll(".character");
    Array.from(allCharacter)
        .forEach(character => character
        .addEventListener('click', function(){
            
            if (emptyInfo=== true){
                characterInfo.classList.remove('hide');
                emptyInfo= false;
            } else {
                prevCharacter.classList.remove('selected');
            }
            character.classList.add('selected'); 
            let characterName= character.lastChild.innerHTML;
            prevCharacter = character;
            loadInfo(characterName);
        }));
}

const getCharacters = async () => {
    const response = await fetch('../json/got.json');
    let data = await response.json();
    data = data.filter(item => !item.hasOwnProperty('dead'));
    characterList= sortName(data);

    createCharacterBox(characterList);
    addClickListener();
}

const characterInfo = document.querySelector(".characters__info"),
    pictureCharacterInfoBox = document.querySelector(".character__picture"),
    nameCharacterInfoBox = document.querySelector(".character__name"),
    houseCharacterInfoBox = document.querySelector(".character__house"),
    bioCharacterInfoBox = document.querySelector(".character__bio");
const loadInfo=(characterName) => {
    const clickedCharacterName = characterList.filter(item => item.name === characterName);
    clickedCharacterName.length === 0 ? alert("Character not found"): "";
    if (clickedCharacterName[0].picture != undefined) {
        pictureCharacterInfoBox.classList.remove('hide');
        pictureCharacterInfoBox.src = `./${clickedCharacterName[0].picture}`;
    } else {
        pictureCharacterInfoBox.classList.add('hide');
    }
    nameCharacterInfoBox.innerHTML = clickedCharacterName[0].name;
    if (clickedCharacterName[0].house != undefined) {
        houseCharacterInfoBox.classList.remove('hide');
        houseCharacterInfoBox.src = `./assets/houses/${clickedCharacterName[0].house}.png`;
    } else {
        houseCharacterInfoBox.classList.add('hide');
    }
    bioCharacterInfoBox.innerHTML = clickedCharacterName[0].bio;    
}

const handleSearchRequest = () => {
    let inputField = document.querySelector('.search__input').value;
    
    loadInfo(inputField);
}

const initialize = () => {
    let searchButton = document.querySelector(".search__button"); 
    let searchInput = document.querySelector(".search__input"); 
    searchButton.addEventListener('click', handleSearchRequest);
    searchInput.addEventListener('keyup', ({ key }) => {
        console.log(key);
        if (key === "Enter") {
            handleSearchRequest();
        }
    })
}

initialize()

export {
    getCharacters
}