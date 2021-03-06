const Word = require('./word.js');
const inquirer = require('inquirer');
// CAUTION: GAME WILL RUN BUT NOT IN THE WAY DESIRED. 
//Word is not being concealed for letter guess, guesses remianing not counting down. 
//Looking up issues and working to fix to make game run according
// to README.md
var target;
var targetWord;
var guesses;
var guessesLeft;

const wordList = ["Aldo", "Barbeque", "Chemistry", "Dunk", "Edge", "Flavor", "Gratious", "Hedonism",
"Indigo", "Jackle", "Kettle", "Lemonade", "Monetize", "Nectarine", "Octopus", "Penthouse", "Quasar", "Rustic",
"Sultry", "Tentacle", "Universe", "Vertical", "Weather", "Xeroderma", "Youngish", "Zarf"];

function randomWord(wordList) {
var index = Math.floor(Math.random() * wordList.length);
return wordList[index];

}

const questions = [
{
        name : 'letterGuessed',
        message : 'Guess a letter',
        validate: function (value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'Please enter single letter';
        },
        when: function () {
            return (!target.allGuessed() && guessesLeft > 0);
    }


},
        { 
        type: 'confirm',
        name:'playagain',
        message: 'want to play again?',
        when: function () {
        return (target.allGuessed() || guessesLeft <= 0);

        }
     }

];

function resetGame() {
targetWord = randomWord(wordList);
target = new Word(targetWord);
target.makeGuess(' ');
guesses = [];
guessesLeft = 9;

}

function ask() {
if (!target.allGuessed() && guessesLeft > 0) {
    console.log(target + '');
}

inquirer.prompt(questions).then(answers => {
    if ('playAgain' in answers && !answers.playAgain) {
        console.log('thanks for playing');
        process.exit();
    }
    if(answers.playAgain) {
        resetGame();
    }
    if (answers.hasOwnProperty('letterguessed')) {
        var currentGuess = answers.lettersGuessed.toLowerCase();
        if(guesses.indexOf(currentGuess) === -1) {
            guesses.push(currentGuess);
            target.makeGuess(currentGuess);
            if (targetWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                guessesLeft--;
            }
        } else {
            console.log('you already guessed', currentGuess);
        }
    }

    if (!target.allGuessed()) {
        if(guessesLeft < 1) {
            console.log('no more guesses');
            console.log(targetWord, 'is correct.');
        }
        else {
            console.log('guesses so far:', guesses.join(' '));
            console.log('guesses remaining:' , guessesLeft);
        }
    } else {
        console.log(targetWord, 'is correct!');
    }
    ask();
}); // End of inquirer prompt for questions & answers
}
    resetGame();
    ask();




