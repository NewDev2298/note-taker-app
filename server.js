const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Displays Note Taker initial page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Displays Note Taker content page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET Route returns saved notes
app.get('/api/notes', (req, res) => {
  // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  readFromFile = () => {
    fs.readFile(destination, JSON.stringify('./db/db.json','utf8', function(err, data)))
  }
});

// POST Route saves new notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} new note saved`);

  const newNote = req.body;


});

app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
}); 
