import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure CSS file is imported

const NoteForm = ({ note, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [color, setColor] = useState('white');
    const [reminder, setReminder] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags.join(', '));
            setColor(note.color);
            setReminder(note.reminder ? new Date(note.reminder).toISOString().slice(0, 16) : '');
        } else {
            setTitle('');
            setContent('');
            setTags('');
            setColor('white');
            setReminder('');
        }
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const noteData = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            color,
            reminder: reminder ? new Date(reminder).toISOString() : null
        };
        if (note) {
            noteData._id = note._id;
        }
        onSave(noteData);
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="note-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="note-body"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <div className="note-form-options">
                <input
                    type="text"
                    className="note-tags"
                    placeholder="Tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <input
                    type="color"
                    className="note-color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <input
                    type="datetime-local"
                    className="note-reminder"
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                />
                <button className="note-submit" type="submit">
                    {note ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
