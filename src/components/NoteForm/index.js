import React, { useState, useEffect } from 'react'; 
import './index.css';

const NoteForm = ({ note, onSave }) => {
    const [title, setTitle] = useState(note ? note.title : '');
    const [content, setContent] = useState(note ? note.content : '');
    const [tags, setTags] = useState(note ? note.tags : []);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...note, title, content, tags });
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setTags([]);
        setTagInput('');
    };

    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tags.length < 9 && tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="note-input"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                className="note-textarea"
            />
            <div className="tags-input">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag} <button type="button" className="remove-tag" onClick={() => handleRemoveTag(tag)}>x</button>
                    </span>
                ))}
                {tags.length < 9 && (
                    <>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInput}
                            placeholder="Add a tag"
                            className="tag-input"
                        />
                        <button type="button" className="add-tag" onClick={handleAddTag}>Add</button>
                    </>
                )}
            </div>
            <button type="submit" className="save-button"> {note ? 'Update' : 'Add Note'}</button>
        </form>
    );
};

export default NoteForm;
