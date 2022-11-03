const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let guessList = require('.modules/guessList');

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

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT);
})
