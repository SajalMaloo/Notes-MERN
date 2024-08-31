import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotesServiceInsance from '../services/NotesService';

const Notes = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const newData = await NotesServiceInsance.getAllNotes();
      setData(newData);
    } catch (error) {
      setErrorMessage(error?.messgae || 'Unable to fetch notes.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul className="notes">

          <li className="add-note-button">
            <Link to={`/add-note`}>+</Link>
          </li>


          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/note/${item._id}`}>
                <h3>{item.title}</h3>

                <p>
                  {item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notes;