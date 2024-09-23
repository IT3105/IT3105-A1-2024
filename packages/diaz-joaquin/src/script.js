const inventoryList = document.getElementById('inventory-list');
const itemForm = document.getElementById('item-form');
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close');
const editItemForm = document.getElementById('edit-item-form');

let inventory = [];

function addItem(item) {
  // Validate input
  if (!item.name || item.quantity <= 0 || item.price <= 0) {
    alert('Please enter valid item details.');
    return;
  }

  inventory.push(item);
  localStorage.setItem('inventory', JSON.stringify(inventory));
  renderInventory();
}

function renderInventory() {
  inventoryList.innerHTML = '';
  inventory.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('inventory-item');
    itemElement.textContent = `${item.name} - Quantity: ${item.quantity} - Price: ${item.price}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
      editItem(index);
    });
    itemElement.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteItem(index);
    });
    itemElement.appendChild(deleteButton);

    inventoryList.appendChild(itemElement);
  });
}

function editItem(index) {
    const item = inventory[index];
    const editItemInputs = editItemForm.elements;
  
    // Populate the edit form with the item's details
    editItemInputs['edit-item-name'].value = item.name;
    editItemInputs['edit-item-quantity'].value = item.quantity;
    editItemInputs['edit-item-price'].value = item.price;
  
    // Show the edit modal
    editModal.style.display = 'block';
  
    editItemForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const updatedItem = {
        name: editItemInputs['edit-item-name'].value || item.name,
        quantity: parseInt(editItemInputs['edit-item-quantity'].value) || item.quantity,
        price: parseFloat(editItemInputs['edit-item-price'].value) || item.price
      };
  
      // Ensure the index is valid before updating the item
      if (index >= 0 && index < inventory.length) {
        inventory[index] = updatedItem;
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderInventory();
      } else {
        console.error('Invalid index:', index);
      }
  
      // Hide the edit modal
      editModal.style.display = 'none';
    });
  }

function deleteItem(index) {
  inventory.splice(index, 1);
  localStorage.setItem('inventory', JSON.stringify(inventory));
  renderInventory();
}

itemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const itemFormInputs = itemForm.elements;
  const newItem = {
    name: itemFormInputs['item-name'].value,
    quantity: parseInt(itemFormInputs['item-quantity'].value),
    price: parseFloat(itemFormInputs['item-price'].value)
  };
  addItem(newItem);
});

// Load inventory from localStorage on page load
const storedInventory = localStorage.getItem('inventory');
if (storedInventory) {
  inventory = JSON.parse(storedInventory);
  renderInventory();
}

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
  editModal.style.display = 'none';
});

