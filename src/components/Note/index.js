import React, { useState, useRef, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import './index.css';

const Note = ({ note, onDelete, onArchive, onEdit, onChangeColor }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleSave = () => {
        onEdit({ ...note, title, content });
        setEditing(false);
    };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="note" style={{ backgroundColor: note.color }}>
            {editing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            )}
            <div className="note-actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => onArchive(note._id)}>
                    {note.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button id='delete-button' onClick={() => onDelete(note._id)}>
                <img src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1721446261/delete_6861294_oduoxe.png" alt="Delete" />
                </button>
                <div className="color-picker" ref={colorPickerRef}>
                    <img
                        src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1721473674/paint_11438038_iewapu.png"
                        alt="Pick Color"
                        onClick={toggleColorPicker}
                        className="color-picker-icon"
                    />
                    {showColorPicker && (
                        <div className="color-options">
                            <CirclePicker
                                colors={['#ffffff', '#ffeb3b', '#ff5722', '#4caf50', '#2196f3', '#9c27b0']}
                                onChangeComplete={(color) => {
                                    onChangeColor(note._id, color.hex);
                                    setShowColorPicker(false);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Note;
