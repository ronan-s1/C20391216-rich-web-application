const contacts = [];

function addContact() {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const errorDiv = document.getElementById("error");

    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();

    errorDiv.style.display = "none";

    if (name === "" || mobile === "" || email === "") {
        errorDiv.textContent = "Please fill out all fields.";
        errorDiv.style.display = "block";
        return;
    }

    if (!/^[A-Za-z\s]{1,20}$/.test(name)) {
        errorDiv.textContent = "Name should contain only alphabets and spaces, up to 20 characters.";
        errorDiv.style.display = "block";
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        errorDiv.textContent = "Mobile should contain 10 digits.";
        errorDiv.style.display = "block";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 40) {
        errorDiv.textContent = "Invalid email format or length exceeds 40 characters.";
        errorDiv.style.display = "block";
        return;
    }

    errorDiv.textContent = "";
    
    const contact = {
        name: name,
        mobile: mobile,
        email: email
    };

    contacts.push(contact);
    updateTable();
    nameInput.value = "";
    mobileInput.value = "";
    emailInput.value = "";
}

function updateTable() {
    const tableBody = document.getElementById("contactTableBody");
    tableBody.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const row = tableBody.insertRow(-1);
        row.insertCell(0).textContent = contact.name;
        row.insertCell(1).textContent = contact.mobile;
        row.insertCell(2).textContent = contact.email;
    }
}

let isAscending = true;

function sortTable(columnIndex) {
    const table = document.getElementById("contactTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.getElementsByTagName("tr"));

    //sort the rows based on the name
    rows.sort((a, b) => {
        const nameA = a.getElementsByTagName("td")[columnIndex].textContent.toLowerCase();
        const nameB = b.getElementsByTagName("td")[columnIndex].textContent.toLowerCase();

        if (isAscending) {
            return nameA.localeCompare(nameB);
        }

        return nameB.localeCompare(nameA);
    });

    //clear the existing rows
    tbody.innerHTML = "";

    //append the sorted rows back to the table
    rows.forEach(row => {
        tbody.appendChild(row);
    });

    //toggle the sorting direction for the next click
    isAscending = !isAscending;
}


function filterContacts() {
    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const noResultDiv = document.getElementById("noResult");
    const table = document.getElementById("contactTable");
    const rows = Array.from(table.getElementsByTagName("tr"));
    rows.shift();

    let matchingRows = 0;

    rows.forEach(row => {
        const mobile = row.getElementsByTagName("td")[1].textContent.trim();
        if (mobile.includes(searchTerm)) {
            row.style.display = "";
            matchingRows++;
        } else {
            row.style.display = "none";
        }
    });

    if (matchingRows === 0) {
        noResultDiv.style.display = "block";
    } else {
        noResultDiv.style.display = "none";
    }

    if (searchTerm == "") {
        noResultDiv.style.display = "none";
    }
}

