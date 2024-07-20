import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import './index.css';

const ArchivedNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const jwtToken = localStorage.getItem('token');

    useEffect(() => {
        if (jwtToken) {
            fetchArchivedNotes();
        }
    }, []);

    const fetchArchivedNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/notes/archived', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(response.data);
        } catch (err) {
            setError('Failed to fetch archived notes');
        } finally {
            setLoading(false);
        }
    };

    const handleUnarchiveNote = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/notes/${id}/archive`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            setError('Failed to unarchive note');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h1>Archived Notes</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="notes-list">
                            {notes.map((note) => (
                                <div key={note._id} className="note">
                                    <div className="note-header">
                                        <button onClick={() => handleUnarchiveNote(note._id)}>Unarchive</button>
                                    </div>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ArchivedNotes;
