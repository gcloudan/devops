const request = require('supertest');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('../../models/note');

// Create a new express app instance for testing
const app = express();

// Setup view engine for the test app
app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import and use your routes
const noteRoutes = require('../../routes/notes');
app.use('/', noteRoutes);

// MongoDB setup
beforeAll(async () => {
  mongoose.set('strictQuery', false);
  const url = 'mongodb://localhost:27017/notes';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Note API Integration Tests', () => {
  it('should render the new note form on GET /new', async () => {
    const response = await request(app).get('/new');
    expect(response.statusCode).toBe(200);
  });

  it('should create a new note with POST /', async () => {
    const response = await request(app)
      .post('/')
      .send({ title: 'Test Note', description: 'This is a test note.' })
      .expect('Location', '/') // Expecting a redirect to the home page
      .expect(302);

    // Verify the note was saved in the database
    const note = await Note.findOne({ title: 'Test Note' });
    expect(note).toBeTruthy();
    expect(note.description).toBe('This is a test note.');
    expect(note.title).toBe('Test Note');
  });

  it('should delete a note with DELETE /:id', async () => {
    // First, create a note to delete
    const note = await new Note({
      title: 'Note to delete',
      description: 'This note will be deleted.'
    }).save();

    const response = await request(app)
      .delete(`/${note._id}`)
      .expect('Location', '/') // Expecting a redirect to the home page
      .expect(302);

    // Verify the note was removed from the database
    const deletedNote = await Note.findById(note._id);
    expect(deletedNote).toBeNull();
  });
});
