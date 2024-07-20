import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import NoteForm from '../NoteForm';
import Header from '../Header';
import './index.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingNote, setEditingNote] = useState(null);

    const jwtToken = localStorage.getItem('token');

    useEffect(() => {
        if (jwtToken) {
            fetchNotes();
        }
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/notes', {
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

    const handleCreateOrUpdateNote = async (note) => {
        try {
            if (note._id) {
                await axios.put(`http://localhost:3001/api/notes/${note._id}`, note, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
            } else {
                await axios.post('http://localhost:3001/api/notes', note, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
            }
            setEditingNote(null);
            fetchNotes();
        } catch (err) {
            setError('Failed to save note');
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
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
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            setError('Failed to archive note');
        }
    };

    if (!jwtToken) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <div className="home">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h1>Welcome to Apsona Notes</h1>
                        {error && <p className="error">{error}</p>}
                        <NoteForm note={editingNote} onSave={handleCreateOrUpdateNote} />
                        <div className="notes-list">
                            {notes.map((note) => (
                                <div key={note._id} className="note">
                                    <div className="note-header">
                                        <button onClick={() => handleArchiveNote(note._id)}>
                                            {note.archived ? 'Unarchive' : 'Archive'}
                                        </button>
                                        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
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

export default Home;
