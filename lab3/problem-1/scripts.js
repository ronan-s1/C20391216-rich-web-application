document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter, tap } = rxjs.operators;

    const noteInput = document.getElementById("note-input");
    const noteColorSelect = document.getElementById("note-color");
    const addNoteBtn = document.getElementById("add-note");
    const noteContainer = document.getElementById("note-container");

    loadNotes();

    // create an observable when add note button is clicked
    const addNoteClick$ = fromEvent(addNoteBtn, 'click');
    addNoteClick$.pipe(
        // call back to change the text and colour
        map(() => ({
            text: noteInput.value.trim(),
            color: noteColorSelect.value
        })),
        // filter out events with empty strings
        filter(note => note.text !== ""),   
        // save note and clear input
        tap(note => {
            addNoteToContainer(note.text, note.color);
            noteInput.value = "";
            saveNotes();
        })
    ).subscribe(); // This is where the observable is triggered and pipeline is executed

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

        const editClick$ = fromEvent(editBtn, 'click');
        editClick$.pipe(
            tap(() => {
                const updatedNoteText = prompt("Edit your note:", noteText);
                if (updatedNoteText !== null) {
                    noteTextElement.textContent = updatedNoteText;
                    saveNotes();
                }
            })
        ).subscribe();

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-light btn-sm";
        deleteBtn.textContent = "Delete";

        const deleteClick$ = fromEvent(deleteBtn, 'click');
        deleteClick$.pipe(
            tap(() => {
                noteContainer.removeChild(noteCard);
                saveNotes();
            })
        ).subscribe();

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
