const guessWords = [
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
const letterId = document.getElementById('letter');
const btnGuessId = document.getElementById('guess');
const playAgainId = document.getElementById('play-again');

let randomNum;
