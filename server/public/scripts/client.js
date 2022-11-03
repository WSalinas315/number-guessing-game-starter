$(document).ready(readyNow);

function readyNow() {
  console.log("jquery is loaded!");
  resetNumber();
  $('#submit-btn').on('click', makeGuess);
}

function makeGuess () {
  console.log('Submitting a guess');

  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then(function(response) {
    console.log('Response!', response);
    renderToDom(response);
  }).catch(function(error) {
    alert('Request failed', error);
  })
}

function renderToDom (guesses) {
  $('#guess-log').empty();

  for (let guess of guesses) {
    // guess is too high
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