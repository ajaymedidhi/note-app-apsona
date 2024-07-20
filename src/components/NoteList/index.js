import React from 'react';
import './index.css';

const NoteList = ({ notes }) => {
  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div>{note.tags.join(', ')}</div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
