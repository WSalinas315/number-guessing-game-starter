$(document).ready(readyNow);

function readyNow() {
  console.log("jquery is loaded!");
  resetNumber();
  $('#submit-btn').on('click', makeGuess);
}

function makeGuess() {
  console.log('Submitting a guess');

  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: {
      p1Guess: $('#user1-guess').val(),
      p2Guess: $('#user2-guess').val()
    }
  }).then(function(response) {
    console.log('Posting guesses:', response);
    getGuess();
  }).catch(function(error) {
    alert('Request failed', error);
  })
}

function getGuess() {
  console.log('Getting the guesses');

  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then(function(response) {
    console.log('We did it!');
    renderToDom(response);
  }).catch(function(error) {
    alert('Error!', error);
  })
}

function renderToDom (guesses) {
  $('#guess-log').empty();

  for (let guess of guesses) {
    // guess is too high
    console.log('guess.p1Guess:', guess.p1Guess);
    console.log('guess.p2Guess:', guess.p2Guess);
    if (guess.p1Guess > randomNumber) {
    }

    // guess is too low
    // winner winner

  }
}

function winnerExplosion () {
  console.log('Winner found!');
}

function resetNumber(){
  let winningNumber = randomNumber(1,25);
  console.log('Winning number to send to /random is:', winningNumber);
  $.ajax({
    method: 'POST',
    url: '/random',
    data: {
      number: winningNumber
    }
  }).then(function(response){
    console.log('Posting new random number');
  }).catch(function(error){
    alert("OH NOOOOO");
  })
}

function randomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1) + min);
}