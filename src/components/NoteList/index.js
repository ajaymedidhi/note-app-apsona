import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const NotesList = ({ jwtToken, onEdit, onDelete, onArchive }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (jwtToken) {
            fetchNotes();
        }
    }, [jwtToken]);

    const fetchNotes = async (query = '') => {
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

    return (
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
                                    <button onClick={() => onEdit(note)}>Edit</button>
                                    <button onClick={() => onArchive(note._id)}>
                                        {note.archived ? 'Unarchive' : 'Archive'}
                                    </button>
                                    <button className="delete-button" onClick={() => onDelete(note._id)}>
                                        <img src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1721446261/delete_6861294_oduoxe.png" alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotesList;
