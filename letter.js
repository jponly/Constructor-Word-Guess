 var letter = function(character) {
    console.log('making a new Letter:', character);
        this.character = character;
        this.guessed = false;
  // CAUTION: GAME WILL RUN BUT NOT IN THE WAY DESIRED. 
  //Word is not being concealed for letter guess, guesses remianing not counting down. 
  //Looking up issues and working to fix to make game run according
 // to README.md
        this.toString = function() {
            return this.guessed ? this.character :'_';
        }

        this.makeGuess = function(newGuess) {
            if (this.character.toLowerCase() === newGuess.toLowerCase()) {
                this.guessed = true;
            }
        }

    }



        module.exports = letter;

         
   