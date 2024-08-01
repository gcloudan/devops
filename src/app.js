const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.SERVER || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', notesRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Has started at http://localhost:${PORT}`);
});

module.exports = app;
