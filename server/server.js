const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let guessList = require('./modules/guessList.js');
let randomNumber = require('./modules/randomNumber.js');
let guessCount = require('./modules/guessCount.js');

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.get('/guesses', (req, res) => {
  console.log('Request for /guesses made');

  res.send(guessList);
})

app.post('/guesses', (req, res) => {
  console.log('Posting request', req.body);

  let guess = req.body;
  guessList.push(guess);

  res.sendStatus(200);
})

app.get('/random', (req, res) => {
  console.log('Request for /random made');
  console.log('DID WE PASS OUR RANDOM NUMBER?:', randomNumber);
  res.send(randomNumber);
})

app.post('/random', (req, res) => {
  console.log('Posting request for /random', req.body);

  let newNum = req.body;
  randomNumber = newNum;

  res.sendStatus(200);
})

app.get('/count', (req, res) => {
  console.log('Request for /count made', guessCount);
  res.send(guessCount);
})

app.post('/count', (req, res) => {
  console.log('Posting request for /count', req.body);

  let newCount = req.body;
  guessCount = newCount;

  res.sendStatus(200);
})

app.delete('/count', (req, res) => {
  console.log('Request to delete /count made');
  guessCount = 0;
  res.sendStatus(201);
})

// Nuke the guessList for another game
app.delete('/guesses', (req, res) => {
    guessList = [];
    res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT);
})
