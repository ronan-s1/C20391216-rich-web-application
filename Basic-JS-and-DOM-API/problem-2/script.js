document.addEventListener("DOMContentLoaded", function() {
    // Constants
    const noteInput = document.getElementById("note-input");
    const noteColorSelect = document.getElementById("note-color");
    const addNoteBtn = document.getElementById("add-note");
    const noteContainer = document.getElementById("note-container");

    // load notes from local storage
    loadNotes();

    // if add note button clicked
    addNoteBtn.addEventListener("click", function() {
        const noteText = noteInput.value.trim();
        const selectedColor = noteColorSelect.value;

        if (noteText !== "") {
            addNoteToContainer(noteText, selectedColor);
            noteInput.value = "";
            saveNotes(); 
        }
    });

    function addNoteToContainer(noteText, color) {
        const noteCard = document.createElement("div");
        // using bootstrap bg class container colour
        noteCard.className = `card text-white bg-${color} mb-3`;
        
        const noteCardBody = document.createElement("div");
        noteCardBody.className = "card-body";

        const noteTextElement = document.createElement("p");
        noteTextElement.className = "card-text";
        noteTextElement.textContent = noteText;

        // edit button clicked
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-light btn-sm mr-2";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function() {
            const updatedNoteText = prompt("Edit your note:", noteText);
            if (updatedNoteText !== null) {
                noteTextElement.textContent = updatedNoteText;
                saveNotes();
            }
        });

        // delete button clicked
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-light btn-sm";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            noteContainer.removeChild(noteCard);
            saveNotes();
        });

        noteCardBody.appendChild(noteTextElement);
        noteCardBody.appendChild(editBtn);
        noteCardBody.appendChild(deleteBtn);

        noteCard.appendChild(noteCardBody);
        noteContainer.appendChild(noteCard);
    }

    // save notes to local storage
    function saveNotes() {
        const notes = [];
        const noteCards = document.querySelectorAll(".card");

        noteCards.forEach(function(card) {
            const textElement = card.querySelector(".card-text");
            let colorClass = card.classList[2];

            // remove the bg-
            const colorValue = colorClass.replace("bg-", "");
            notes.push({
                text: textElement.textContent,
                color: colorValue,
            });
        });

        localStorage.setItem("notes", JSON.stringify(notes));
    }


    // load notes from local storage
    function loadNotes() {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            notes.forEach(function(note) {
                addNoteToContainer(note.text, note.color);
            });
        }
    }
    
});
