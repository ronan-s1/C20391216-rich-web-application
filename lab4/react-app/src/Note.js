// src/Note.js

import React from 'react';

function Note({ text, color, onEdit, onDelete }) {
    return (
        <div className={`card text-white bg-${color} mb-3`}>
            <div className="card-body">
                <p className="card-text">{text}</p>
                <button className="btn btn-light btn-sm mr-2" onClick={onEdit}>
                    Edit
                </button>
                <button className="btn btn-light btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Note;
