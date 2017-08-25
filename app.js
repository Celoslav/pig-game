/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, diceSix, endGame = 100;
init();
setValue();



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        var diceDOM = document.querySelector('.dice-' + activePlayer);
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice > 1) {

            if ((dice + diceSix) === 12) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                diceSix = 0;
                nextPlayer();
            } else {
                diceSix = dice;
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }

        } else {
            //next player
            nextPlayer();
        }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= endGame) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-'+ activePlayer).style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceSix = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    if (endGame < 10) {
        endGame = 100;
    }
    document.querySelector('.set-peak input').value = endGame;
    document.querySelector('.set-peak h4').textContent = "First one reaches " + endGame + " si the winner!";
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function setValue() {
    var inputSet = document.getElementById('high-end');
    inputSet.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
            endGame = inputSet.value;
            document.querySelector('.set-peak h4').textContent = "First one reaches " + endGame + " si the winner!";
            inputSet.blur();
        }
        if (endGame > 10) {
            return endGame;
        } else if (endGame === '') {
            endGame = 100;
            document.querySelector('.set-peak h4').textContent = "First one reaches " + endGame + " si the winner!";
            init();
            inputSet.placeholder = endGame;
        } else if (endGame < 10) {
            document.querySelector('.set-peak h4').textContent = "Set number higher than 10";
            gamePlaying = false;
        }
    });
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';
/*
1. Dvije sestice zaredom - igrac gubi sve poene
2. Input za postavljanje pobjedonosnog rezultata 
3. Kockica za svakog igraca - dvije kockice

*/