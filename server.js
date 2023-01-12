const express = require('express');
const path = require('path');
const fs = require('fs');
const { uuid } = require('uuidv4');
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

  fs.readFileSync('./db/db.json', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
    }
    const notes = JSON.parse(data);
    return res.json(notes);
  
  });
});

// POST Route saves new notes
app.post('/api/notes', (req, res) => {

  fs.readFileSync('./db/db.json', 'utf8');
    
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  };

  notes.push(newNote);
  const stringedNotes = JSON.stringify(notes);
  fs.writeFileSync('./db/db.json', newNote, function(err, data) {
    if(err) {
      console.log(err);
    }
  })

  res.json('saved')

});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)

});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
}); 
