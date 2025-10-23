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
const letterInputId = document.getElementById('letter-input');
const letterLabelId = document.getElementById('letter-label');
const btnGuessId = document.getElementById('guess');
const btnStartGameId = document.getElementById('play-game');
const playAgainId = document.getElementById('play-again');
const remainingId = document.getElementById('remaining');
const attemptsId = document.getElementById('attempts');

let word = '';
let displayWords = [];
let guessWord = [];
let guessedLetters = 0;
let attempts = 8;

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
    guessWord = word.split("");
    displayWords = Array(word.length).fill("_");
    refreshDisplay();
    
    letterLabelId.classList.remove('hide');
    letterInputId.classList.remove('hide');
    btnGuessId.classList.remove('hide');
    btnStartGameId.classList.add('hide');
}

const guessLetter = () => {
    if(letterInputId.value.length > 1){
        guessedLettersId.innerText = "Introduce only 1 letter";
        return;
    }
    guessedLettersId.innerText = "";

    let i;
    let countAttempt = true;
    for(i = 0; i < guessWord.length; i++){
        if(guessWord[i] == letterInputId.value){
            guessedLettersId.innerText = "You got it !!";
            displayWords[i] = letterInputId.value;
            countAttempt = false;
        }
    }
    if(countAttempt){
        attempts--;   
        if(attempts <= 0){
            endGame();
            return;
        }
    }

    refreshDisplay();
}

const endGame = () => {
    
}

const generateRandomNumber = () =>  {
    return Math.floor(Math.random() * keyWords.length);
}

const refreshDisplay = () => {
    wordInProgressId.innerText = displayWords.join(" ");
    if(attempts == 1){
        attemptsId.innerText = attempts +  " guess";
    }else{
        attemptsId.innerText = attempts + " guesses";
    }
}