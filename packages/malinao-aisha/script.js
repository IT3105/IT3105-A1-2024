document.addEventListener('DOMContentLoaded', () => {
    const addEntryButton = document.getElementById('add-entry-button');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const entryForm = document.getElementById('entry-form');
    const entriesList = document.getElementById('entries-list');
    const noEntriesMessage = document.getElementById('no-entries-message');
    const editModal = document.getElementById('edit-modal');
    const closeEditModalButton = document.getElementById('close-edit-modal');
    const editForm = document.getElementById('edit-form');
    const editTitleInput = document.getElementById('edit-title');
    const editTextInput = document.getElementById('edit-text');
    const editIndexInput = document.getElementById('edit-index');

    addEntryButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeEditModalButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
        if (event.target === editModal) editModal.style.display = 'none';
    });

    entryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const entryTitle = document.getElementById('entry-title').value.trim();
        const entryText = document.getElementById('entry-text').value.trim();
        const entryDate = getCurrentDate(); // Use current date for new entries

        if (entryTitle && entryText) {
            addEntry(entryTitle, entryText, entryDate);
            entryForm.reset(); // Clear the form fields
            modal.style.display = 'none';
        }
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = editTitleInput.value.trim();
        const text = editTextInput.value.trim();
        const index = editIndexInput.value;

        if (title && text) {
            const date = getCurrentDate(); // Update the date to the current date
            updateEntry(index, title, text, date);
            editModal.style.display = 'none';
        }
    });

    function addEntry(title, text, date) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="entry-box">
                <div class="entry-title-date">
                    <span class="entry-title">${title}</span>
                    <span class="entry-date">${formatDate(date)}</span>
                </div>
                <div class="entry-content">
                    <p class="entry-text">${text}</p>
                    <button class="edit-button">Edit</button>
                </div>
                <button class="delete-button">Delete</button>
            </div>
        `;

        const entryBox = li.querySelector('.entry-box');
        const editButton = li.querySelector('.edit-button');
        const deleteButton = li.querySelector('.delete-button');

        entryBox.addEventListener('click', () => {
            entryBox.classList.toggle('active');
            const showButtons = entryBox.classList.contains('active');
            editButton.style.display = showButtons ? 'block' : 'none';
            deleteButton.style.display = showButtons ? 'block' : 'none';
        });

        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const title = entryBox.querySelector('.entry-title').textContent;
            const text = entryBox.querySelector('.entry-text').textContent;

            editTitleInput.value = title;
            editTextInput.value = text;
            editIndexInput.value = Array.from(entriesList.children).indexOf(li);
            editModal.style.display = 'block';
        });

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            entriesList.removeChild(li);
            checkNoEntriesMessage();
        });

        entriesList.appendChild(li);
        checkNoEntriesMessage();
    }

    function updateEntry(index, title, text, date) {
        const entryBox = entriesList.children[index].querySelector('.entry-box');
        entryBox.querySelector('.entry-title').textContent = title;
        entryBox.querySelector('.entry-text').textContent = text;
        entryBox.querySelector('.entry-date').textContent = formatDate(date);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function getCurrentDate() {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }

    function checkNoEntriesMessage() {
        noEntriesMessage.style.display = entriesList.children.length === 0 ? 'block' : 'none';
    }
});
