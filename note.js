const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote, searchNotes, getTaggedNotes, getArchivedNotes, getTrashNotes } = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);
router.get('/search', auth, searchNotes);
router.get('/tags/:tag', auth, getTaggedNotes);
router.get('/archived', auth, getArchivedNotes);
router.get('/trash', auth, getTrashNotes);

module.exports = router;
