const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  const note = await new Note({
    title: req.body.title,
    description: req.body.description
  });
  try {
    await note.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.render('new');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
});

module.exports = router;
