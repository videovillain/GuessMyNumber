'use strict';

////////////////////////////
/// GAME

// DOM ELEMENTS
const btnAgain = document.querySelector('.btn.again');
const btnCheck = document.querySelector('.btn.check');
const labelBetween = document.querySelector('.between');
const labelMyNumber = document.querySelector('.number');
const labelMessage = document.querySelector('.message');
const spanScore = document.querySelector('.score');
const spanHighScore = document.querySelector('.highscore');
const inputGuess = document.querySelector('.guess');
const htmlBody = document.querySelector('body');
const labelH1 = document.querySelector('h1');
// MODAL DOM ELEMENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');


const gameInit = {
  maxNum: 20,
  score: 20,
  highScore: 0,
};

let maxNum = gameInit.maxNum;
let mySecretNumber;
let score = gameInit.score;
let highScore = gameInit.highScore;
let curLow = 0;
let curHigh = 0;
let higherThan = 1;
let lowerThan = gameInit.maxNum;
let gameOver = false;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const setSecretNumber = (max, secret = null) => {
  secret ? (mySecretNumber = secret) : (mySecretNumber = randomInt(1, max));
  // console.log(`Secret Number: ${mySecretNumber}`);
};
setSecretNumber(maxNum);

const displayMessage = (message, color = '#ef4') => {
  labelMessage.style.color = color;
  setTimeout(() => {
    // labelMessage.style.transitionDuration = '1'
    labelMessage.style.color = '#eee';
  }, 500);
  labelMessage.textContent = message;
};

const reset = () => {
  score = gameInit.score;
  higherThan = 1;
  lowerThan = maxNum;
  gameOver = false;
  // score = maxNum;
  spanScore.textContent = score;
  labelBetween.textContent = `(From 1 to ${maxNum})`;
  labelMyNumber.textContent = `?`;
  inputGuess.value = ``;
  inputGuess.focus();
  inputGuess.select();
  displayMessage(`Start guessing...`, '#eee');

  htmlBody.style.backgroundColor = '#222222';
  labelMyNumber.style.width = '15rem';
};
reset();

////////////////////////////
/// MODAL

// // MODAL FUNCTIONS
// const showModal = () => {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = () => {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// // MODAL EVENT LISTENERS
// labelBetween.addEventListener('click', showModal);
// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);
// document.addEventListener('keyup', e => e.key === 'Escape' && closeModal());

// FUNCTIONS
const focusInput = () => {
  inputGuess.focus();
  inputGuess.select();
};

const setBetween = () => {
  const currentMaxNum = maxNum;
  maxNum = 0;
  while (!maxNum) {
    maxNum = prompt('Select a maximum number:');
    if (maxNum === null) {
      maxNum = currentMaxNum;
      return;
    }
  }
  labelBetween.textContent = `(From 1 to ${maxNum})`;
  setSecretNumber(Number(maxNum));
  reset();
  highScore = 0;
  // spanScore.textContent = maxNum;
  spanHighScore.textContent = highScore;
  focusInput();
};

const checkNum = () => {
  const userGuess = Number(inputGuess.value);
  let msg = '';

  if (!gameOver) {
    if (userGuess === 0 || userGuess > maxNum) {
      displayMessage(`📛 From 1 to ${maxNum} 📛`, '#f45');
      focusInput();
    } else if (userGuess === mySecretNumber) {
      displayMessage(`🎉 CORRECT 🎉`, '#61d111');
      labelMyNumber.textContent = mySecretNumber;
      htmlBody.style.backgroundColor = '#60b347';
      labelMyNumber.style.width = '30rem';
      if (score > highScore) {
        highScore = score;
        spanHighScore.textContent = highScore;
      }
      gameOver = true;
    } else {
      if (userGuess < mySecretNumber) {
        if (higherThan <= userGuess) higherThan = userGuess + 1;
        msg = `👆 Higher ${higherThan} ~ ${lowerThan}`;
      } else {
        if (lowerThan >= userGuess) lowerThan = userGuess - 1;
        msg = `👇 Lower ${higherThan} ~ ${lowerThan}`;
      }
      if (higherThan === lowerThan) msg = `It must be ${higherThan}!!`;
      spanScore.textContent = --score;
      displayMessage(msg);
      focusInput();
    }
  }

  if (score <= 0 && !gameOver) {
    msg = `😭 Sorry, Game Over 😭`;
    displayMessage(msg);
    gameOver = true;
  }
};

const playAgain = () => {
  setSecretNumber(maxNum);
  reset();
  focusInput();
};

const setMyNumber = () => {
  let secret = 0;
  while (!secret) {
    const num = prompt(`Set number from 1 to ${maxNum}!`);
    if (num === null) return;
    if (Number(num) > 0 && Number(num) <= maxNum) secret = Number(num);
  }
  setSecretNumber(maxNum, secret);
  reset();
  focusInput();
};

// EVENTS
labelBetween.addEventListener('click', setBetween);
btnCheck.addEventListener('click', checkNum);
btnAgain.addEventListener('click', playAgain);
labelH1.addEventListener('click', setMyNumber);

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'Enter':
      checkNum();
      break;
    case 'r':
      e.preventDefault();
      playAgain();
      break;
    case 'm':
      e.preventDefault();
      setMyNumber();
      break;
    case 'b':
      e.preventDefault();
      setBetween();
      break;
    default:
  }
});
