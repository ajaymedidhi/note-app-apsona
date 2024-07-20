import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Header from '../Header';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const jwtToken = localStorage.getItem('token');

    useEffect(() => {
        if (jwtToken) {
            fetchNotes();
        }
    }, [jwtToken]);

    const fetchNotes = async (query = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/notes?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(response.data);
        } catch (err) {
            setError('Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchNotes(e.target.value);
    };

    const handleEditNote = (note) => {
        // Handle editing note logic here
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            fetchNotes();
        } catch (err) {
            setError('Failed to delete note');
        }
    };

    const handleArchiveNote = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/notes/${id}/archive`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            fetchNotes();
        } catch (err) {
            setError('Failed to archive note');
        }
    };

    return (
        <>
        <Header/>
        <div className="notes-list-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                    <div className="notes-list">
                        {notes.map((note) => (
                            <div key={note._id} className="note">
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <div className="note-actions">
                                    <button onClick={() => handleEditNote(note)}>Edit</button>
                                    <button onClick={() => handleArchiveNote(note._id)}>
                                        {note.archived ? 'Unarchive' : 'Archive'}
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteNote(note._id)}>
                                        <img src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1721446261/delete_6861294_oduoxe.png" alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        </>
    );
};

export default NotesList;
