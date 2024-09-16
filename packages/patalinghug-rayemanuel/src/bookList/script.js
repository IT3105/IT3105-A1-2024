const addBookButton = document.getElementById("add");
const bookForm = document.getElementById("bookForm");
const submitBookButton = document.getElementById("submitBook");
const cancelBookButton = document.getElementById("cancelBook");
const bookTable = document.querySelector("table");
let selectedRow = null;

addBookButton.addEventListener("click", () => {
  bookForm.style.display = "block"; // Ensure the form is visible
  setTimeout(() => {
    bookForm.classList.add("show"); // Add the opacity transition
  }, 10); // Add a small delay to trigger the transition
  clearForm();
});

cancelBookButton.addEventListener("click", () => {
  bookForm.classList.remove("show"); // Start hiding the form
  setTimeout(() => {
    bookForm.style.display = "none"; // Set display to none after opacity transition ends
  }, 300); // Delay matching the CSS transition duration (0.3s)
  selectedRow = null;
});

submitBookButton.addEventListener("click", () => {
  const bookName = document.getElementById("bookName").value;
  const authorName = document.getElementById("authorName").value;
  const genre = document.getElementById("genre").value;
  
  if (selectedRow === null) {
    // Create a new row and cells for the book details
    const newRow = bookTable.insertRow(-1); 
    const bookNameCell = newRow.insertCell(0);
    const authorNameCell = newRow.insertCell(1);
    const genreCell = newRow.insertCell(2);
    const statusCell = newRow.insertCell(3);
    const functionsCell = newRow.insertCell(4);

    // Fill the cells with the book details
    bookNameCell.textContent = bookName;
    authorNameCell.textContent = authorName;
    genreCell.textContent = genre;
    statusCell.textContent = "to read"; // Default status

    // Create "Edit", "Delete", and "Status" buttons for the new book
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-Button");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-Button");

    const statusButton = document.createElement("button");
    statusButton.textContent = "Status";
    statusButton.classList.add("status-Button");
    

    editButton.addEventListener("click", () => {
      editBook(newRow);
    });

    deleteButton.addEventListener("click", () => {
      deleteBook(newRow);
    });

    statusButton.addEventListener("click", () => {
      showStatusOptions(statusCell);
    });

    functionsCell.appendChild(editButton);
    functionsCell.appendChild(deleteButton);
    functionsCell.appendChild(statusButton);
  } else {
    // Update the selected row with the edited book details
    selectedRow.cells[0].textContent = bookName;
    selectedRow.cells[1].textContent = authorName;
    selectedRow.cells[2].textContent = genre;
    selectedRow = null;
  }

  clearForm();
  bookForm.style.display = "none";
});

function clearForm() {
  document.getElementById("bookName").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("genre").value = "";
}

function editBook(row) {
  selectedRow = row;
  // Get the values of the book details from the row
  const bookName = row.cells[0].textContent;
  const authorName = row.cells[1].textContent;
  const genre = row.cells[2].textContent;

  // Set the values of the book details in the form
  document.getElementById("bookName").value = bookName;
  document.getElementById("authorName").value = authorName;
  document.getElementById("genre").value = genre;

  // Display the form
  bookForm.style.display = "block";
}

function deleteBook(row) {
  bookTable.deleteRow(row.rowIndex);
}

function showStatusOptions(statusCell) {
  const statusOptions = document.getElementById("statusOptions");
  statusOptions.style.display = "block";

  const statusButtons = document.querySelectorAll(".statusButton");
  statusButtons.forEach(button => {
    button.addEventListener("click", () => {
      statusCell.textContent = button.getAttribute("data-status");
      statusOptions.style.display = "none";
    });
  });
}