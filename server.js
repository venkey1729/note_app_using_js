const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let notes = [];

app.post('/api/notes', (req, res) => {
  const note = { ...req.body, _id: Date.now().toString(), archived: false };
  notes.push(note);
  res.json(note);
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(query) || 
    note.content.toLowerCase().includes(query)
  );
  res.json(filteredNotes);
});

app.get('/api/notes/archived', (req, res) => {
  const archivedNotes = notes.filter(note => note.archived);
  res.json(archivedNotes);
});

app.get('/api/notes/trash', (req, res) => {
  const trashNotes = notes.filter(note => note.trashed);
  res.json(trashNotes);
});

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note._id !== req.params.id);
  res.json({ message: 'Note deleted' });
});

app.put('/api/notes/:id', (req, res) => {
  notes = notes.map(note => 
    note._id === req.params.id ? { ...note, ...req.body } : note
  );
  const updatedNote = notes.find(note => note._id === req.params.id);
  res.json(updatedNote);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
