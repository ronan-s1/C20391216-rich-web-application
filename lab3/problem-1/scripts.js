document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter } = rxjs.operators;

    const noteInput = document.getElementById("note-input");
    const noteColorSelect = document.getElementById("note-color");
    const addNoteBtn = document.getElementById("add-note");
    const noteContainer = document.getElementById("note-container");

    loadNotes();

    const addNoteClick$ = fromEvent(addNoteBtn, 'click');

    addNoteClick$.pipe(
        map(() => ({
            text: noteInput.value.trim(),
            color: noteColorSelect.value
        })),
        filter(note => note.text !== "")
    ).subscribe(note => {
        addNoteToContainer(note.text, note.color);
        noteInput.value = "";
        saveNotes();
    });

    function addNoteToContainer(noteText, color) {
        const noteCard = document.createElement("div");
        noteCard.className = `card text-white bg-${color} mb-3`;

        const noteCardBody = document.createElement("div");
        noteCardBody.className = "card-body";

        const noteTextElement = document.createElement("p");
        noteTextElement.className = "card-text";
        noteTextElement.textContent = noteText;

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-light btn-sm mr-2";
        editBtn.textContent = "Edit";
        fromEvent(editBtn, 'click').subscribe(() => {
            const updatedNoteText = prompt("Edit your note:", noteText);
            if (updatedNoteText !== null) {
                noteTextElement.textContent = updatedNoteText;
                saveNotes();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-light btn-sm";
        deleteBtn.textContent = "Delete";
        fromEvent(deleteBtn, 'click').subscribe(() => {
            noteContainer.removeChild(noteCard);
            saveNotes();
        });

        noteCardBody.appendChild(noteTextElement);
        noteCardBody.appendChild(editBtn);
        noteCardBody.appendChild(deleteBtn);

        noteCard.appendChild(noteCardBody);
        noteContainer.appendChild(noteCard);
    }

    function saveNotes() {
        const notes = [];
        const noteCards = document.querySelectorAll(".card");

        noteCards.forEach(function (card) {
            const textElement = card.querySelector(".card-text");
            let colorClass = card.classList[2];
            const colorValue = colorClass.replace("bg-", "");
            notes.push({
                text: textElement.textContent,
                color: colorValue,
            });
        });

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            notes.forEach(function (note) {
                addNoteToContainer(note.text, note.color);
            });
        }
    }
});
