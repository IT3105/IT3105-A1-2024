const startCount = document.getElementById("start-btn");
const pauseCount = document.getElementById("pause-btn");
const resetCount = document.getElementById("reset-btn");
const timerEl = document.getElementById("timer");

startCount.addEventListener("click", startCountdown);
pauseCount.addEventListener("click", pauseCountdown);
resetCount.addEventListener("click", resetCountdown);

let interval;
let timeLeft = 1500;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  timerEl.innerHTML = formattedTime;
}

function startCountdown() {
  const clickSound = new Audio("audio/ClickSound.mp3");
  clickSound.playbackRate = 1.5;
  clickSound.play();
  startCount.style.display = "none";
  pauseCount.style.display = "block";
  resetCount.style.transition = "0.2s ease-out";
  resetCount.style.opacity = 0;
  interval = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    updateTimer();
  }, 1000);
}

function pauseCountdown() {
  const clickSound = new Audio("audio/ClickSound.mp3");
  clickSound.playbackRate = 1.5;
  clickSound.play();
  pauseCount.style.display = "none";
  startCount.style.display = "block";
  resetCount.style.opacity = 1;
  clearInterval(interval);
}

function resetCountdown() {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();
}

let userTasks = [];

const addTaskBtn = document.querySelector(".add-task-container");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const inputContainer = document.querySelector(".input-task-container");
  const hideAddTask = document.querySelector(".add-task-container");
  inputContainer.style.display = "block";
  hideAddTask.style.display = "none";

  const saveBtn = document.querySelector(".save-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  saveBtn.addEventListener("click", saveTask);
  cancelBtn.addEventListener("click", cancelTask);

  function saveTask() {
    inputContainer.style.display = "none";
    hideAddTask.style.display = "flex";

    let l = { tsk: "" };

    const { value: task } = document.getElementById("task-input");

    l.tsk = task;

    if (!task == "") {
      const userTask = { ...l };
      userTasks.push(userTask);
      document.getElementById("form-control").reset();
      displayTasks();
    }
  }

  function cancelTask() {
    inputContainer.style.display = "none";
    hideAddTask.style.display = "flex";
    document.getElementById("form-control").reset();
  }
}

function strikeText(index) {
  const clickSound = new Audio("audio/MouseClick.mp3");
  clickSound.playbackRate = 1.5;
  clickSound.play();
  const taskSpan = document.querySelector(`.task-${index}`);
  const icon = document.querySelector(`.icon-${index}`);
  taskSpan.classList.toggle("completed");
  icon.classList.toggle("checked");
}

function displayTasks() {
  const taskCount = document.getElementById("count");
  taskCount.innerText = userTasks.length;

  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = "";

  const ul = document.createElement("ul");

  userTasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = `task-${index}`;
    span.innerText = task.tsk;

    const icon = document.createElement("span");
    const i = document.createElement("i");
    i.className = `fa-solid fa-check icon-${index}`;
    icon.appendChild(i);
    i.style.cursor = "pointer";

    icon.addEventListener("click", () => strikeText(index));

    li.appendChild(icon);
    li.appendChild(span);
    ul.appendChild(li);
  });
  listContainer.appendChild(ul);
}

document.querySelector(".reset-task").addEventListener("click", () => {
  const listContainer = document.getElementById("list-container");
  userTasks.splice(0, userTasks.length);
  listContainer.innerHTML = "";
  listContainer.innerHTML = "No task yet";
  document.getElementById("count").innerText = 0;
});
