import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
// Assuming you have a delete icon in the assets folder
import './index.css';

const DeletedNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
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
            setNotes(response.data);
        } catch (err) {
            setError('Failed to fetch deleted notes');
        } finally {
            setLoading(false);
        }
    };

    const handleRestoreNote = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/notes/${id}/restore`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            setError('Failed to restore note');
        }
    };

    const handleDeletePermanently = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/notes/${id}/permanent`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            setError('Failed to delete note permanently');
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
                        <h1>Deleted Notes</h1>
                        <h2>All notes will be automatically erased after 30 days</h2>
                        {error && <p className="error">{error}</p>}
                        <div className="notes-list">
                            {notes.map((note) => (
                                <div key={note._id} className="note">
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <div className="note-header">
                                        <button onClick={() => handleRestoreNote(note._id)}>Restore</button>
                                        <button className="delete-button" onClick={() => handleDeletePermanently(note._id)}>
                                            <img src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1721446261/delete_6861294_oduoxe.png" alt="Delete" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DeletedNotes;
