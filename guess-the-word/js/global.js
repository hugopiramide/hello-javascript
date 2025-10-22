const keyWords = [
    "platano",
    "rubio",
    "animal",
    "persona", 
    "juguete",
    "patata",
    "sombrero",
    "caracola",
    "esternocleidomastoideo",
    "kiwi"
]
const messageId = document.getElementById('message');
const wordInProgressId = document.getElementById('word-in-progress');
const guessedLettersId = document.getElementById('guessed-letters')
const letterInputId = document.getElementById('letter');
const btnGuessId = document.getElementById('guess');
const btnStartGameId = document.getElementById('play-game');
const playAgainId = document.getElementById('play-again');

let word = '';
let displayWords = [];
let guessedWords = [];

btnStartGameId.addEventListener('click', (event) => {
    event.preventDefault();
    startGame();       
})

btnGuessId.addEventListener('click', (event) => {
    event.preventDefault();
    guessLetter();
})


const startGame = () => {
    word = keyWords[generateRandomNumber()];
    displayWords = Array(word.length).fill("_");
    wordInProgressId.innerText = displayWords.join(" ");
    
    btnStartGameId.classList.add('hide');
    btnGuessId.classList.remove('hide');
}

const guessLetter = () => {
    if(letterInputId.value.length > 1){
        return '8===)';
    }
    
}

const  generateRandomNumber = () =>  {
    return Math.floor(Math.random() * keyWords.length);
}