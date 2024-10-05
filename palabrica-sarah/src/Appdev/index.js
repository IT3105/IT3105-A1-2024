
let tasks = [];

function showInput() {
  document.getElementById('taskInput').style.display = 'inline-block';
  document.getElementById('addButton').style.display = 'inline-block';
  document.getElementById('showInputButton').style.display = 'none';
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task !== "") {
    tasks.push(task);
    displayTasks();
    taskInput.value = '';
  }
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index]);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index] = newTask.trim();
    displayTasks();
  }
}