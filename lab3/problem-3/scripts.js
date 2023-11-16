document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter, tap } = rxjs.operators;

    class Note {
        constructor(text, color, parent = null) {
            this.text = text;
            this.color = color;
            this.parent = parent;
            this.children = [];
            this.noteCard = null; // Reference to the DOM element

            if (parent) {
                parent.addChild(this);
            }

            this.render();
        }

        addChild(child) {
            this.children.push(child);
        }

        removeChild(child) {
            if (this.children.includes(child)) {
                this.children = this.children.filter(c => c !== child);
                child.parent = null; // Remove reference to parent
                child.remove(); // Remove child's DOM element
            }
        }

        remove() {
            if (this.noteCard && this.noteCard.parentNode) {
                this.noteCard.parentNode.removeChild(this.noteCard);
            }
        }

        render() {
            this.noteCard = document.createElement("div");
            this.noteCard.className = `card text-white bg-${this.color} mb-3`;

            const noteCardBody = document.createElement("div");
            noteCardBody.className = "card-body";

            const noteTextElement = document.createElement("p");
            noteTextElement.className = "card-text";
            noteTextElement.textContent = this.text;

            const editBtn = document.createElement("button");
            editBtn.className = "btn btn-light btn-sm mr-2";
            editBtn.textContent = "Edit";

            const editClick$ = fromEvent(editBtn, 'click');
            editClick$.pipe(
                tap(() => {
                    const updatedNoteText = prompt("Edit your note:", this.text);
                    if (updatedNoteText !== null) {
                        noteTextElement.textContent = updatedNoteText;
                    }
                })
            ).subscribe();

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-light btn-sm";
            deleteBtn.textContent = "Delete";

            const deleteClick$ = fromEvent(deleteBtn, 'click');
            deleteClick$.pipe(
                tap(() => {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    } else {
                        // If it's the parent, remove all children
                        this.children.forEach(child => {
                            child.remove();
                        });
                        notes.length = 0; // Clear the notes array
                    }
                    this.remove(); // Remove the current note
                })
            ).subscribe();

            noteCardBody.appendChild(noteTextElement);
            noteCardBody.appendChild(editBtn);
            noteCardBody.appendChild(deleteBtn);

            this.noteCard.appendChild(noteCardBody);
            noteContainer.appendChild(this.noteCard);
        }
    }

    const noteInput = document.getElementById("note-input");
    const noteColorSelect = document.getElementById("note-color");
    const addNoteBtn = document.getElementById("add-note");
    const noteContainer = document.getElementById("note-container");

    const notes = [];

    const addNoteClick$ = fromEvent(addNoteBtn, 'click');

    addNoteClick$.pipe(
        map(() => ({
            text: noteInput.value.trim(),
            color: noteColorSelect.value
        })),
        filter(note => note.text !== ""),
        tap(note => {
            if (notes.length === 0) {
                // First note is the parent
                const newNote = new Note(note.text, note.color);
                notes.push(newNote);
            } else {
                // Subsequent notes are children of the first note
                const newChildNote = new Note(note.text, note.color, notes[0]);
                notes[0].addChild(newChildNote);
            }

            noteInput.value = "";
        })
    ).subscribe();
   
});
