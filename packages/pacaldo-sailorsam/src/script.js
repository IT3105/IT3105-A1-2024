const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");

addButton.addEventListener("click", addItem);

function addItem() {
    if (inputBox.value === '') {
        alert("Please enter an item.");
        return;
    }

    // Create the list item
    const li = document.createElement("li");

    // Add the checkbox to mark the item as "bought"
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("check-btn");
    checkbox.addEventListener("change", function() {
        li.classList.toggle("checked");
    });

    // Add item text
    const itemText = document.createElement("span");
    itemText.textContent = inputBox.value;
    itemText.classList.add("item-text");

    // Edit button
    const editButton = document.createElement("span");
    editButton.innerHTML = "✏️"; // Edit icon
    editButton.classList.add("edit-btn");
    editButton.onclick = () => editItem(itemText);

    // Delete button
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "✖"; // Delete icon
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => li.remove();

    // Add actions to a container
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("item-actions");
    actionContainer.appendChild(editButton);
    actionContainer.appendChild(deleteButton);

    // Append checkbox, text, and actions to the list item
    li.appendChild(checkbox);
    li.appendChild(itemText);
    li.appendChild(actionContainer);

    // Append to the list
    listContainer.appendChild(li);

    // Clear the input box
    inputBox.value = '';
}

function editItem(itemText) {
    const newItemText = prompt("Edit item:", itemText.textContent);
    if (newItemText !== null && newItemText !== '') {
        itemText.textContent = newItemText;
    }
}
