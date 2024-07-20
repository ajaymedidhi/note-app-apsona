import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const Deleted = () => {
    const [deletedNotes, setDeletedNotes] = useState([]);
    const [error, setError] = useState('');
    const jwtToken = localStorage.getItem('token');

    useEffect(() => {
        if (jwtToken) {
            fetchDeletedNotes();
        }
    }, []);

    const fetchDeletedNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/notes/deleted', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setDeletedNotes(response.data);
        } catch (err) {
            setError('Failed to fetch deleted notes');
        }
    };

    return (
        <div className='deleted'>
            <h2>Deleted Notes</h2>
            {error && <p>{error}</p>}
            <ul>
                {deletedNotes.map((note) => (
                    <li key={note._id} className="note-item">
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <p>Deleted on: {new Date(note.deletedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Deleted;
