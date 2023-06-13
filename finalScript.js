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

let playing, scores, currentScore, activePlayer; 


// Setting the initial scores to zero and hiding the dice image.
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const newGame = function() {
  // Keeps track of the state of the gmae i.e still playinh or not
  playing = true;
  
  // Switch to other player. 0 -> player1 & 1 -> player2
  activePlayer = 0;
  
  // currentScore keeps track of the score of the active player.
  currentScore = 0;
  scores = [0, 0];
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  
  player1CurrScore.textContent = 0;
  player2CurrScore.textContent = 0;
  
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);

  player1El.classList.remove(`player--active`);
  player0El.classList.add(`player--active`);
}
newGame();


const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
  if (playing) {
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    
    // Removing the hidden property of dice image.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNum}.png `;
    
    // If dice is not 1, then add the number rolled to the current score of the player.
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
      // When the dice shows number 1, the player loses the current score and the other player can start his game.
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function() {
  if (playing) {
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      
      document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
      document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
    }
    else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', newGame);

