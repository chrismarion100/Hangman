main();

function main() {
    hangman();
}
//List of words that will be the secretWord
function hangman() {
    const words = [
        "We're no strangers to love",
        "You know the rules and so do I",
        "A full commitment's what I'm thinking of",
        "You wouldn't get this from any other guy",
        "I just wanna tell you how I'm feeling",
        "Gotta make you understand",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "We've known each other for so long",
        "Your heart's been aching, but you're too shy to say it",
        "Inside, we both know what's been going on",
        "We know the game and we're gonna play it",
        "And if you ask me how I'm feeling",
        "Don't tell me you're too blind to see",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you"
    ];

    function generateSecretWord() {
        let randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    }

    let secretWord = generateSecretWord();
    let guessedLetters = [];
    let incorrectGuesses = [];
    let guesses = 6;

    function displayWordState() {
        let display = '';
        for (let letter of secretWord) {
            if (letter === ' ' || letter === "'") {
                display += letter === ' ' ? '&nbsp;' : "'";
            } else if (guessedLetters.includes(letter)) {
                display += letter;
            } else {
                display += '_';
            }
            display += '&nbsp;';
        }
        return display.trim();
    }    

    function updateGuessedLetters(guessedLetter) {
        if (secretWord.includes(guessedLetter)) {
            guessedLetters.push(guessedLetter);
        } else if (!incorrectGuesses.includes(guessedLetter)) {
            incorrectGuesses.push(guessedLetter);
            guesses--;
        }
    }

    function displayHangmanState() {
        let guessesLeft = document.getElementById("guessesLeft");
        let wordToGuess = document.getElementById("wordToGuess");
        let incorrectLetters = document.getElementById("incorrectLetters");
        let restartButton = document.getElementById("restartButton");
        let gameMessage = document.getElementById("gameMessage");
        let youtubeDiv = document.getElementById("youtubeVideo");
    
        guessesLeft.innerHTML = "Guesses left: " + guesses;
        wordToGuess.innerHTML = displayWordState();
        incorrectLetters.innerHTML = "Incorrect guesses: " + incorrectGuesses.join(', ');
    
        let displayedWord = displayWordState().replace(/\s/g, '_');
        let secretWordNoSpaces = secretWord.replace(/\s/g, '');
    
        if (displayedWord.replace(/&nbsp;/g, '') === secretWordNoSpaces) {
            gameMessage.innerHTML = "You won!";
            document.getElementById("guessInput").style.display = "none";
            document.getElementById("guessButton").style.display = "none";
            guessesLeft.style.display = "none";
        } else if (guesses === 0) {
            gameMessage.innerHTML = "Sorry, you lost. The lyric was:<br><span class='bigFont'>" + secretWord + "</span>.";
            document.getElementById("guessInput").style.display = "none";
            document.getElementById("guessButton").style.display = "none";
            restartButton.style.display = "block";
            guessesLeft.style.display = "none";
    
            // Check if YouTube video is already added before appending
            if (!youtubeDiv.querySelector("iframe")) {
                const youtubeEmbed = document.createElement("iframe");
                youtubeEmbed.width = "560";
                youtubeEmbed.height = "315";
                youtubeEmbed.src = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=xFq1XIZ-jiVaWF-O&amp;controls=0";
                youtubeEmbed.title = "YouTube video player";
                youtubeEmbed.frameBorder = "0";
                youtubeEmbed.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                youtubeEmbed.allowFullscreen = true;
    
                youtubeDiv.appendChild(youtubeEmbed);
            }
        } else {
            restartButton.style.display = "none";
            gameMessage.innerHTML = "";
            youtubeDiv.innerHTML = ""; // Remove the YouTube video if displayed
        }
    }
    
    
    function handleGuess() {
        let guessedLetter = document.getElementById("guessInput").value.toUpperCase();
    
        if (guessedLetters.includes(guessedLetter) || incorrectGuesses.includes(guessedLetter)) {
            alert("You have already guessed '" + guessedLetter + "'. Please guess another letter.");
        } else {
            if (/[A-Z]/.test(guessedLetter) && guessedLetter.length === 1) {
                updateGuessedLetters(guessedLetter);
            } else {
                document.getElementById("guessInput").value = '';
                alert("Please enter a letter you haven't guessed.");
            }
        }
    
        displayHangmanState();
        updateHangmanImage();
        document.getElementById("guessInput").value = '';
    }

    document.getElementById("guessButton").addEventListener("click", handleGuess);

    let hangmanImg = document.getElementById("hangmanImg");
    let hangmanPath = "images/";
  
    function updateHangmanImage() {
        let hangmanImg = document.getElementById("hangmanImg");
        let hangmanPath = "images/";

        // Replace the previous if-else block with a switch statement
        switch (guesses) {
            case 6:
                hangmanImg.src = hangmanPath + "default.png";
                break;
            case 5:
                hangmanImg.src = hangmanPath + "guessOne.png";
                break;
            case 4:
                hangmanImg.src = hangmanPath + "guessTwo.png";
                break;
            case 3:
                hangmanImg.src = hangmanPath + "guessThree.png";
                break;
            case 2:
                hangmanImg.src = hangmanPath + "guessFour.png";
                break;
            case 1:
                hangmanImg.src = hangmanPath + "guessFive.png";
                break;
            case 0:
                hangmanImg.src = hangmanPath + "guessSix.png";
                break;
            default:
                hangmanImg.src = hangmanPath + "default.png";
                break;
        }
    }

    displayHangmanState();
    document.getElementById("restartButton").addEventListener("click", function () {
        location.reload(); // Reloads the page to restart the game
    });
}