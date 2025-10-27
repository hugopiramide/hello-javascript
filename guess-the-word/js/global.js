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
let displayWord = [];
let guessWord = [];
let attempts;

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
    displayWord = Array(word.length).fill("_");
    attempts = 8;
    refreshDisplay();
    
    guessedLettersId.innerText = '';
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
            displayWord[i] = letterInputId.value;
            countAttempt = false;
        }
    }
    if(countAttempt && letterInputId.value != ''){
        attempts--;   
        if(attempts <= 0){
            guessedLettersId.innerText = "NOT TODAY, SORRY";
            endGame();
            return;
        }
    }

    refreshDisplay();
}

const endGame = () => {
    letterInputId.classList.add('hide');
    btnGuessId.classList.add('hide');
    btnStartGameId.classList.remove('hide');
}

const winner = () => {

    const equals = displayWord.length === guessWord.length && displayWord.every((val, i) => val === guessWord[i]);
        
    if(equals){
        confetti({ 
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
        guessedLettersId.innerText = "CONGRATULATIONS, YOU WON";
        return true;
    }
    return false;
}

const generateRandomNumber = () =>  {
    return Math.floor(Math.random() * keyWords.length);
}

const refreshDisplay = () => {
    wordInProgressId.innerText = displayWord.join(" ");
    if(attempts == 1){
        attemptsId.innerText = attempts +  " guess";
    }else{
        attemptsId.innerText = attempts + " guesses";
    }
    letterInputId.value = '';
    
    if(winner()){
        endGame();
    }
}