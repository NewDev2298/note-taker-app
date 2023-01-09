const express = require('express');
const path = require('path');
const { readFromFile } = require('./db/db.json');
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
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

// POST Route saves new notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} new note saved`);

  const newNote = req.body;

  if
});

app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
}); 
