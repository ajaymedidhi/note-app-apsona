import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import NoteForm from '../NoteForm';
import Note from '../Note';
import Header from '../Header';
import './index.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingNote, setEditingNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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
            let updatedNotes;
            if (note._id) {
                await axios.put(`http://localhost:3001/api/notes/${note._id}`, note, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                // Update the note in the state
                updatedNotes = notes.map(n => n._id === note._id ? note : n);
            } else {
                const response = await axios.post('http://localhost:3001/api/notes', note, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                // Add the newly created note to the state
                updatedNotes = [...notes, response.data];
            }
            setNotes(updatedNotes);
            setEditingNote(null);
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
            setNotes(notes.map(note =>
                note._id === id ? { ...note, archived: true } : note
            ));
        } catch (err) {
            setError('Failed to archive note');
        }
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
    };

    const handleChangeColor = async (id, color) => {
        try {
            await axios.put(`http://localhost:3001/api/notes/${id}`, { color }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            // No need to fetch notes again; update directly in state
            setNotes(notes.map(note =>
                note._id === id ? { ...note, color } : note
            ));
        } catch (err) {
            setError('Failed to change color');
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredNotes = notes.filter(note =>
        !note.archived &&
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

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
                    <div className="home-container">
                        <div className="left-panel">
                            {error && <p className="error">{error}</p>}
                            <NoteForm note={editingNote} onSave={handleCreateOrUpdateNote} />
                        </div>
                        <div className="right-panel">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="search-bar"
                            />
                            <div className="notes-list">
                                {filteredNotes.map((note) => (
                                    <Note
                                        key={note._id}
                                        note={note}
                                        onDelete={handleDeleteNote}
                                        onArchive={handleArchiveNote}
                                        onEdit={handleEditNote}
                                        onChangeColor={handleChangeColor}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
