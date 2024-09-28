document.addEventListener('DOMContentLoaded', initializeApp);

const CATEGORIES = {
    notStarted: 'notStartedList',
    pending: 'pendingList',
    finished: 'finishedList'
};

let tasks = [];
let currentEditTaskId = null;

function initializeApp() {
    const elements = {
        taskInput: document.getElementById('taskInput'),
        addTaskBtn: document.getElementById('addTaskBtn'),
        modal: document.getElementById('editModal'),
        editTaskInput: document.getElementById('editTaskInput'),
        closeBtn: document.querySelector('.close-btn'),
        editForm: document.getElementById('editForm')
    };

    attachEventListeners(elements);
    setupDragAndDrop();
}

function attachEventListeners(elements) {
    elements.addTaskBtn.addEventListener('click', () => handleAddTask(elements.taskInput));
    elements.closeBtn.addEventListener('click', () => closeModal(elements.modal));
    elements.editForm.addEventListener('submit', (event) => handleSaveEdit(event, elements));
}

function setupDragAndDrop() {
    Object.values(CATEGORIES).forEach(categoryId => {
        const column = document.getElementById(categoryId).parentElement;
        column.addEventListener('dragover', preventDefault);
        column.addEventListener('drop', (event) => handleDrop(event, categoryId));
    });
}

function handleAddTask(taskInput) {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = createTask(taskText, 'notStarted');
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

function createTask(text, category) {
    return { id: Date.now(), text, category };
}

function handleEditTask(taskId, editTaskInput, modal) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
        currentEditTaskId = taskId;
        editTaskInput.value = taskToEdit.text;
        openModal(modal);
    }
}

function handleSaveEdit(event, elements) {
    event.preventDefault();
    const updatedText = elements.editTaskInput.value.trim();
    if (updatedText && currentEditTaskId !== null) {
        const taskToEdit = tasks.find(task => task.id === currentEditTaskId);
        if (taskToEdit) {
            taskToEdit.text = updatedText;
            renderTasks();
        }
        closeModal(elements.modal);
    }
}

function handleDeleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function renderTasks() {
    clearAllColumns();
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const li = createTaskElement(task);
    attachTaskEventListeners(li, task);
    document.getElementById(CATEGORIES[task.category]).appendChild(li);
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('draggable', true);
    li.dataset.id = task.id;
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-options">
            <span class="more-options">...</span>
            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
    return li;
}

function attachTaskEventListeners(li, task) {
    const moreOptions = li.querySelector('.more-options');
    const taskButtons = li.querySelector('.task-buttons');

    moreOptions.addEventListener('click', (event) => toggleTaskButtons(event, taskButtons));
    li.querySelector('.edit-btn').addEventListener('click', (event) => handleTaskButtonClick(event, () => handleEditTask(task.id, document.getElementById('editTaskInput'), document.getElementById('editModal')), taskButtons));
    li.querySelector('.delete-btn').addEventListener('click', (event) => handleTaskButtonClick(event, () => handleDeleteTask(task.id), taskButtons));

    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);

    document.addEventListener('click', (event) => {
        if (!li.contains(event.target)) {
            taskButtons.style.display = 'none';
        }
    });
}

function toggleTaskButtons(event, taskButtons) {
    event.stopPropagation();
    taskButtons.style.display = taskButtons.style.display === 'block' ? 'none' : 'block';
}

function handleTaskButtonClick(event, action, taskButtons) {
    event.stopPropagation();
    action();
    taskButtons.style.display = 'none';
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    setTimeout(() => { event.target.style.display = 'none'; }, 0);
}

function handleDragEnd(event) {
    setTimeout(() => { event.target.style.display = 'block'; }, 0);
}

function preventDefault(event) {
    event.preventDefault();
}

function handleDrop(event, categoryId) {
    const taskId = parseInt(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.category = Object.keys(CATEGORIES).find(key => CATEGORIES[key] === categoryId);
        renderTasks();
    }
}

function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
    currentEditTaskId = null;
    document.getElementById('editTaskInput').value = '';
}

function clearAllColumns() {
    Object.values(CATEGORIES).forEach(categoryId => {
        document.getElementById(categoryId).innerHTML = '';
    });
}