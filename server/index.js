import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './connectDB.js';
import { NotesModel } from './models/Notes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await NotesModel.find({});
    if (!notes) {
      return res.sendStatus(404)
    }
    return res.status(201).json(notes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong',
      stack: err.stack

    })
  }
})

app.get('/api/notes/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await NotesModel.findById(noteId);
    if (!note) {
      return res.sendStatus(404)
    }
    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong',
      stack: err.stack

    })
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await NotesModel.create({ title, description });
    if (!note) {
      return res.sendStatus(404)
    }
    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong',
      stack: err.stack

    })
  }
})

app.put('/api/notes/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const note = await NotesModel.findByIdAndUpdate(noteId, { title, description });
    if (!note) {
      return res.sendStatus(404)
    }
    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong',
      stack: err.stack

    })
  }
})

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await NotesModel.findByIdAndDelete(noteId);
    if (!note) {
      return res.sendStatus(404)
    }
    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong',
      stack: err.stack

    })
  }
})

app.get('*', (req, res) => res.sendStatus(404))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));