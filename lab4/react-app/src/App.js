import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Note from './Note';

function App() {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [selectedColor, setSelectedColor] = useState('primary');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const addNote = (text) => {
        if (text.trim() !== '') {
            setNotes((prevNotes) => [
                ...prevNotes,
                { text: text.trim(), color: selectedColor },
            ]);
            setNoteText('');
            saveNotes();
        }
    };

    const editNote = (index) => {
        const updatedNoteText = prompt('Edit your note:', notes[index].text);
        if (updatedNoteText !== null) {
            const updatedNotes = [...notes];
            updatedNotes[index].text = updatedNoteText;
            setNotes(updatedNotes);
            saveNotes();
        }
    };

    const deleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        saveNotes();
    };

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const loadNotes = () => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    };

    const fetchCatFact = async () => {
        try {
            const response = await Axios.get('https://catfact.ninja/fact');
            const data = response.data;

            if (data.fact) {
                // Pass the cat fact as the text parameter
                addNote(data.fact);
            }
        } catch (error) {
            console.error('Error fetching cat fact:', error);
        }
    };

    const startRecognition = () => {
        const recognition = new window.webkitSpeechRecognition(); // For Safari
        recognition.lang = 'en-UK';

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setNoteText((prevText) => prevText + transcript);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">React Note App</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Add a new note"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                    <div className="input-group mb-3">
                        <select
                            className="custom-select"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            <option value="primary">Blue</option>
                            <option value="danger">Red</option>
                            <option value="warning">Orange</option>
                        </select>
                        <div className="input-group-append">
                            <button
                                className="add-note-button btn text-white"
                                onClick={() => addNote(noteText)}
                            >
                                Add Note
                            </button>
                            <button
                                className="cat-fact-button btn text-white"
                                onClick={fetchCatFact}
                            >
                                Cat Fact
                            </button>
                            <button
                                className={`voice-recognition-button btn text-white ${isRecording ? 'recording' : ''}`}
                                onClick={startRecognition}
                            >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                {notes.map((note, index) => (
                    <Note
                        key={index}
                        text={note.text}
                        color={note.color}
                        onEdit={() => editNote(index)}
                        onDelete={() => deleteNote(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
