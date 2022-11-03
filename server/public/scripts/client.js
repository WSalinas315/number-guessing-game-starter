$(document).ready(readyNow);

let guessCounter = 0;
let winningNumber;

function readyNow() {
  console.log("jquery is loaded!");
  resetNumber();
  $('#submit-btn').on('click', makeGuess);
  $('#guess-count').on('click', '#reset-btn', resetGame);
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

  $('#user1-guess').val('');
  $('#user2-guess').val('');

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
$('#guess-count').empty();
guessCounter++;
$('#guess-count').append(`${guessCounter}`);

for (let guess of guesses) {

  //player one guess
  // guess is too high
  console.log('guess.p1Guess:', guess.p1Guess);
  console.log('guess.p2Guess:', guess.p2Guess);

    if (guess.p1Guess > winningNumber) {
      $('#guess-log').append(`
        <tr>
          <td>Player One</td>
          <td>${guess.p1Guess}</td>
          <td>'Guess is too high!'</td>
        </tr>
      `)
    }

    // guess is too low
    else if (guess.p1Guess < winningNumber) {
      $('#guess-log').append(`
      <tr>
        <td>Player One</td>
        <td>${guess.p1Guess}</td>
        <td>'Guess is too low!'</td>
      </tr>
    `)
    }

    // winner winner
    else if (guess.p1Guess == winningNumber) {
      $('#guess-log').append(`
      <tr>
        <td>Player One</td>
        <td>${guess.p1Guess}</td>
        <td class ="celebrate">'You guessed correctly!!'</td>
      </tr>
    `)
    winnerExplosion();
    } 

    // player two guess
    // guess is too high
    if (guess.p2Guess > winningNumber) {
      $('#guess-log').append(`
        <tr>
          <td>Player Two</td>
          <td>${guess.p2Guess}</td>
          <td>'Guess is too high!'</td>
        </tr>
      `)
    }

    // guess is too low
    else if (guess.p2Guess < winningNumber) {
      $('#guess-log').append(`
      <tr>
        <td>Player Two</td>
        <td>${guess.p2Guess}</td>
        <td>'Guess is too low!'</td>
      </tr>
    `)
    }

    // winner winner
    else if (guess.p2Guess == winningNumber) {
      $('#guess-log').append(`
      <tr>
        <td>Player Two</td>
        <td>${guess.p2Guess}</td>
        <td class ="celebrate">'You guessed correctly!!'</td>
      </tr>
    `)
    winnerExplosion();
    } 
  }
}

function winnerExplosion () {
  console.log('Winner found!');
$('#guess-count').append(`
<br />
    <button id="reset-btn">Reset Game</button>
  `)
  alert('WINNER!!');
}

function resetNumber(){
  winningNumber = randomNumber(1,25);
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

function resetGame() {
  console.log('Resetting Game');
  guessCounter = 0;
  resetNumber();
  $('#guess-log').empty();
  $('#guess-count').empty();

  $.ajax({
    method: 'DELETE',
    url: '/guesses',
    data: { method: 'delete'}
  }).then(function(response){
    console.log('Guess Log Cleared out:', response);
  })
}