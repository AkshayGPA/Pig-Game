'use strict';

// Selecting elements that display scores of two players
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const player1CurrScore = document.getElementById('current--0');
const player2CurrScore = document.getElementById('current--1');


// Setting the initial scores to zero and hiding the dice image.
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];

// currentScore keeps track of the score of the active player.
let currentScore = 0;

// Switch to other player. 0 -> player1 & 1 -> player2
let activePlayer = 0;


// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNum);

    // Removing the hidden property of dice image.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNum}.png `;

    // If dice is not 1, then add the number rolled to the current score of the player.
    if (randomNum !== 1) {
        currentScore += randomNum;
        // player1CurrScore.textContent = currentScore;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
        // When the dice shows number 1, the player loses the current score and the other player can start his game.
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        activePlayer = activePlayer === 0 ? 1 : 0;
        console.log(`Active player is ${activePlayer}`); 
        currentScore = 0;
        
        player0El.classList.toggle(`player--active`);
        player1El.classList.toggle(`player--active`);
    }

});