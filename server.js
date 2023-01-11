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

  fs.readFile('./db/db.json', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      // throw new Error(err);
    }
    console.log(data);
    console.log(typeof data);
    return res.json(data);
  
  });
});

// POST Route saves new notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} new note saved`);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  }

  console.log("New Data: ", newNote)

  fs.writeFile('./db/db.json', newNote, function(err, data) {
    if(err) {
      console.log(err);
    }
    console.log(data);
    res.json(data)
  })

});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)

});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
}); 
