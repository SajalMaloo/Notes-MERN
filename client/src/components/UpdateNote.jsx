import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotesServiceInstance from "../services/NotesService";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NotesServiceInstance.getNote(id);
        setTitle(response.title);
        setDescription(response.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await NotesServiceInstance.updateNote(id, {
        title,
        description,
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };


  const removeNote = async (e) => {
    e.preventDefault();
    try {
      await NotesServiceInstance.deleteNote(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <div className="breadcrump-nav">
      <Link to="/" className="back-button">
        👈 back
      </Link>

      <button onClick={removeNote} className="delete">
        ❌ Remove
      </button>

      </div>


      <form onSubmit={updateNote}>
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
          value={submitted ? "Updating note..." : "Update Note"}
          disabled={submitted}
        />
      </form>
    </div>
  );
}

export default UpdateNote;