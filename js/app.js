$(document).ready(function () {

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });
    // Function to generate the random number
    function secretNum(min, max) {
        var secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return secretNumber;
    }

    var secretNumber = secretNum(1, 100);
    var oldGuess = 0;
    var counter = 30;

    // Function to implement a simple validation of the iser input
    function validation(guessedNumber) {

        //check the guessed number in the console
        console.log("Guessed Number: " + guessedNumber);


        /* start applying validation, from the less restrictive one to the most restrictive one; each rule NEGATES the truth*/
        //make sure that we get a number
        if (isNaN(guessedNumber)) {
            alert('You must enter anumber!!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //if the number is divisible by 1 it means it is an integer (it has no decimals)
        if (guessedNumber % 1 !== 0) {
            alert('You must enter an integer value!!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //if the guessedNumber is smaller than 1 OR the guessedNumber is bigger than 100...
        else if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please guess a number between 1 to 100!!');
            //reset the guess value to nothing
            $('#userGuess').val('');
            return false; // this means, stop the loop and don't do anything else
        }

        //else the guessedNumber is valid
        else {
            guessFeedback(secretNumber, guessedNumber);
            counter--;
            //update the guess history
            guessHistory();
            //update the number of guesses
            guessCounter(counter);
            $('#userGuess').val('');

            //if the number of guesses is smaller than 0 it means that the game is over
            if (counter <= 0) {
                $('#feedback').text('Game Over!');
                document.getElementById("userGuess").disabled = true;
                document.getElementById("guessButton").disabled = true;
                alert('The Secret number was ' + secretNumber + ' ! Better luck next time !!');
            }
        }
    }
    // Function to provide feedback to the user
    function guessFeedback(secretNumber, guessedNumber) {
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('Helado!');
            document.body.style.backgroundColor = '#002cb3';
        } else if (difference >= 30 && difference <= 49) {
            $('#feedback').text('Frio!');
            document.body.style.backgroundColor = '#3333cc';
        } else if (difference >= 20 && difference <= 29) {
            $('#feedback').text('Tibio!');
            document.body.style.backgroundColor = '#8533ff';
        } else if (difference >= 10 && difference <= 19) {
            $('#feedback').text('Caliente!');
            document.body.style.backgroundColor = '#b84dff';
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Muy Caliente!');
            document.body.style.backgroundColor = '#fc0446';
        } else {
            $('#feedback').text('Bravo!');
            document.body.style.backgroundColor = '#ff0404';
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
        }
    }

    // Function to provide relative feedback to the user
    function relativeFeedback(secretNumber, oldGuess, newGuess) {
        var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
        var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
        if (newDiff > oldDiff) {
            $('#relative-feedback').text('You are colder than the last guess!');
        } else if (newDiff === oldDiff) {
            $('#relative-feedback').text('You are as far as your previous guess!');
        } else {
            $('#relative-feedback').text('You are hotter than the last guess!');
        }
    }

    // Function to count the number of guesses
    function guessCounter(counter) {
        $('#count').text(counter);
    }

    // Function to show the history of guesses
    function guessHistory() {
        $('#guessList').append('<li>' + parseInt($('#userGuess').val(), 10) + '</li>');
    }
    // Function to start a new game
    function newGame() {
        document.location.reload(true);
    }

    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {
        var guessedNumber = $('#userGuess').val();
        var newGuess = guessedNumber;

        //validate all the numbers
        validation(guessedNumber);

        //only if the user added more than one guess (there is a guess history)

        if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }
        //re-update the old guess with the the new value
        oldGuess = newGuess;
    });

    $('#userGuess').on('keypress', function (e) {

        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = guessedNumber;

            //validate all the numbers
            validation(guessedNumber);

            //only if the user added more than one guess (there is a guess history)

            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            //re-update the old guess with the the new value
            oldGuess = newGuess;
        }

    });
});
