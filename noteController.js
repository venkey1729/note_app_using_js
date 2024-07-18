const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, backgroundColor } = req.body;
    const newNote = new Note({
      title,
      content,
      tags,
      backgroundColor,
      userId: req.user.userId,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, trash: false, archived: false });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, { trash: true });
    res.status(200).json({ message: 'Note moved to trash' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    const notes = await Note.find({ userId: req.user.userId, title: { $regex: query, $options: 'i' }, trash: false, archived: false });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaggedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, tags: req.params.tag, trash: false, archived: false });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, archived: true });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrashNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, trash: true, updatedAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
