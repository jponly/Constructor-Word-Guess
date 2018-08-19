const letter = require('./letter.js');
// CAUTION: GAME WILL RUN BUT NOT IN THE WAY DESIRED. 
//Word is not being concealed for letter guess, guesses remianing not counting down. 
//Looking up issues and working to fix to make game run according
// to README.md
function word(wordString) { 
    this.letterArray = [];

wordString.split('').forEach(element => {
    this.letterArray.push(new letter(element));
});

this.toString = function() {
    return this.letterArray.join('');

}

this.makeGuess = function (guessedLetter) {
    this.letterArray.forEach(element => {
        element.makeGuess(guessedLetter);
    });
}

this.allGuessed = function() {
    return this.letterArray.every((currentValue) => currentValue.guessed);
    }
}

module.exports = word;
