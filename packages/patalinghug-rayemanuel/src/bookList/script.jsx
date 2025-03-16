document.addEventListener("DOMContentLoaded", function () {
  const addContactButton = document.getElementById("add");
  const contactForm = document.getElementById("contactForm");
  const submitContactButton = document.getElementById("submitContact");
  const cancelContactButton = document.getElementById("cancelContact");
  const contactTable = document.querySelector("table");
  let selectedRow = null;

  addContactButton.addEventListener("click", () => {
    contactForm.style.display = "block";
    clearForm();
  });

  cancelContactButton.addEventListener("click", () => {
    contactForm.style.display = "none";
    selectedRow = null; // Clears the selected row when canceling
  });

  submitContactButton.addEventListener("click", () => {
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const email = document.getElementById("email").value;
    const contactNumber = document.getElementById("contactNumber").value;

    if (selectedRow === null) {
      // Create a new row and cells for the contact details
      const newRow = contactTable.insertRow(-1); 
      const lastNameCell = newRow.insertCell(0);
      const firstNameCell = newRow.insertCell(1);
      const emailCell = newRow.insertCell(2);
      const contactNumberCell = newRow.insertCell(3);
      const functionsCell = newRow.insertCell(4);

      // Fill the cells with the contact details
      lastNameCell.textContent = lastName;
      firstNameCell.textContent = firstName;
      emailCell.textContent = email;
      contactNumberCell.textContent = contactNumber;

      // Create "Edit" and "Delete" buttons for the new contact
      const editButton = document.createElement("button");
      editButton.textContent = "EDIT";
      editButton.classList.add("edit-Button");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      deleteButton.classList.add("delete-Button");

      editButton.addEventListener("click", () => {
        editContact(newRow);
      });

      deleteButton.addEventListener("click", () => {
        deleteContact(newRow);
      });

      functionsCell.appendChild(editButton);
      functionsCell.appendChild(deleteButton);
    } else {
      // Update the selected row with the edited contact details
      selectedRow.cells[0].textContent = lastName;
      selectedRow.cells[1].textContent = firstName;
      selectedRow.cells[2].textContent = email;
      selectedRow.cells[3].textContent = contactNumber;
      selectedRow = null;
    }

    clearForm();
    contactForm.style.display = "none";
  });

  function clearForm() {
    document.getElementById("lastName").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contactNumber").value = "";
  }

  function editContact(row) {
    selectedRow = row;
    // Get the values of the contact details from the row
    const lastName = row.cells[0].textContent;
    const firstName = row.cells[1].textContent;
    const email = row.cells[2].textContent;
    const contactNumber = row.cells[3].textContent;

    // Set the values of the contact details in the form
    document.getElementById("lastName").value = lastName;
    document.getElementById("firstName").value = firstName;
    document.getElementById("email").value = email;
    document.getElementById("contactNumber").value = contactNumber;

    // display the form
    contactForm.style.display = "block";
  }

  function deleteContact(row) {
    contactTable.deleteRow(row.rowIndex);
  }
});
