import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NotesServiceInstance from '../services/NotesService';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();

    try {
      await NotesServiceInstance.addNote({
        title,
        description,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setTitle('');
        setDescription('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        {'<-'}
      </Link>

      <form onSubmit={addNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value={submitted ? "Saving note..." : "Save Note"}
          disabled={submitted}
        />
      </form>
    </div>
  )
}

export default AddNote;
