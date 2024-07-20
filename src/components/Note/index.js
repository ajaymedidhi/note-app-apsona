import React from 'react';
import './index.css';

const Note = ({ note }) => {
  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tags: {note.tags.join(', ')}</p>
    </div>
  );
};

export default Note;
