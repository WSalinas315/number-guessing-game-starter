$(document).ready(readyNow);

function readyNow() {
  console.log("jquery is loaded!");

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