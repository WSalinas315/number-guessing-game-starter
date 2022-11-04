$(document).ready(readyNow);

//global variables
let guessCounter = 0;
let winningNumber;
let minNumber;
let maxNumber;

// readyNow function
function readyNow() {
  console.log("jquery is loaded!");
  //resetGame();

  $('#submit-btn').on('click', makeGuess);
  $('#range-btn').on('click', setRange);
  $('#reset-btn-space').on('click', '#reset-btn', resetGame);
}

// sets number range for the game
function setRange(){
  minNumber = $('#minNum').val();
  maxNumber = $('#maxNum').val();
  resetGame();
  $('#range-btn').attr('disabled', true);
  $('#minNum').attr('disabled', true);
  $('#maxNum').attr('disabled', true);
}

// handles sending guesses to the server
function makeGuess() {
  console.log('Submitting a guess');
  $('.errorMsg').empty();

  if(($('#user1-guess').val() === '') || $('#user2-guess').val() === ''){
    $('.errorMsg').append(`
      <h4>Both players must make a guess.</h4>
    `);
    return;
  }

  if($('#user1-guess').val() === $('#user2-guess').val()){
    $('.errorMsg').append(`
      <h4>Players must guess different numbers. THERE ARE NO TIES HERE.</h4>
    `);
    return;
  }

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

// gets guesses from the server
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

// render to dom and compare guesses against winning number
function renderToDom (guesses) {
$('#guess-log').empty();
$('#guess-count').empty();
guessCounter++;

$.ajax({
  method: 'POST',
  url: '/count',
  data: {
    number: guessCounter
  }
}).then(function(response) {
  console.log('Ah ah ah!');
}).catch(function(error) {
  alert('Error!', error);
})

$('#guess-count').append(`${guessCounter}`);

for (let guess of guesses) {

  //player one guess
  // guess is too high
  console.log('guess.p1Guess:', guess.p1Guess);
  console.log('guess.p2Guess:', guess.p2Guess);

    if (guess.p1Guess > winningNumber) {
      $('#guess-log').prepend(`
        <tr>
          <td>Player One</td>
          <td>${guess.p1Guess}</td>
          <td>Guess is too high!</td>
        </tr>
      `)
    }

    // guess is too low
    else if (guess.p1Guess < winningNumber) {
      $('#guess-log').prepend(`
      <tr>
        <td>Player One</td>
        <td>${guess.p1Guess}</td>
        <td>Guess is too low!</td>
      </tr>
    `)
    }

    // winner winner
    else if (guess.p1Guess == winningNumber) {
      $('#guess-log').prepend(`
      <tr class ="celebrate">
        <td>Player One</td>
        <td>${guess.p1Guess}</td>
        <td >You guessed correctly!!</td>
      </tr>
    `)
    winnerExplosion('Player 1');
    } 

    // player two guess
    // guess is too high
    if (guess.p2Guess > winningNumber) {
      $('#guess-log').prepend(`
        <tr>
          <td>Player Two</td>
          <td>${guess.p2Guess}</td>
          <td>Guess is too high!</td>
        </tr>
      `)
    }

    // guess is too low
    else if (guess.p2Guess < winningNumber) {
      $('#guess-log').prepend(`
      <tr>
        <td>Player Two</td>
        <td>${guess.p2Guess}</td>
        <td>Guess is too low!</td>
      </tr>
    `)
    }

    // winner winner
    else if (guess.p2Guess == winningNumber) {
      $('#guess-log').prepend(`
      <tr class ="celebrate">
        <td>Player Two</td>
        <td>${guess.p2Guess}</td>
        <td >You guessed correctly!!</td>
      </tr>
    `)
    winnerExplosion('Player 2');
    } 
  }
}

// Let the winner know they annihilated their foe
function winnerExplosion (player) {
  console.log('Winner found!');
  let winString = player + ' is the WINNER!!!!!!!!';
  console.log(winString);
  $('#reset-btn-space').append(`
    <br />
    <button id="reset-btn">Reset Game</button>
  `);
  alert(winString);
  $('#submit-btn').attr("disabled", true);
}
// reset number function
function resetNumber(){
  winningNumber = randomNumber(minNumber,maxNumber);
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

//generate random number with min/max parameters
function randomNumber(min, max){
  console.log('Figure out random number. Min value', min, 'max value', max);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1) + min);
}

// function to set up for a new game
function resetGame() {
  console.log('Resetting Game');
  guessCounter = 0;
  resetNumber();
  $('#guess-log').empty();
  $('#guess-count').empty();
  $('#submit-btn').attr("disabled", false);
  $('#range-btn').attr('disabled', false);
  $('#minNum').attr('disabled', false);
  $('#maxNum').attr('disabled', false);

  $.ajax({
    method: 'DELETE',
    url: '/guesses',
    data: { method: 'delete'}
  }).then(function(response){
    console.log('Guess Log Cleared out:', response);
  })
}