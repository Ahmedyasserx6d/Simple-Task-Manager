let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveAtLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// DOM Elements
const TaskForm = document.getElementById("task-form");
const TaskInput = document.getElementById("task-input");
const TaskList = document.getElementById("task-list");
const FilterAll = document.getElementById("filter-all");
const FilterCompleted = document.getElementById("filter-completed");
const FilterPending = document.getElementById("filter-pending");

// Add Task
function AddTask(description) {
  const task = {
    id: Date.now(),
    description: description,
    completed: false,
  };
  tasks.push(task);
  saveAtLocalStorage();
  renderTasks();
}

// Delete Task
function DeleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId); // لازم tasks =
  saveAtLocalStorage();
  renderTasks();
}

// Toggle Task
function ToggleAndDeleteTasks(taskId) {
  let task = tasks.find((task) => task.id == taskId);
  if (task) {
    task.completed = !task.completed; // علشان يقبل true و false
  }
  saveAtLocalStorage();
  renderTasks();
}

// Render Task
function renderTasks(filter = "all") {
  TaskList.innerHTML = "";
  const filterTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filterTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) taskElement.classList.add("task-completed");

    taskElement.innerHTML = `
      <span>${task.description}</span>
      <div>
        <button onclick='ToggleAndDeleteTasks(${task.id})'>Toggle</button>
        <button onclick='DeleteTask(${task.id})'>Delete</button>
      </div>
    `;
    TaskList.appendChild(taskElement);
  });
}

// Task form event
TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskDescription = TaskInput.value.trim();
  if (taskDescription) {
    AddTask(taskDescription);
    TaskInput.value = "";
  }
});

// Filters
FilterAll.onclick = () => renderTasks("all");
FilterCompleted.onclick = () => renderTasks("completed");
FilterPending.onclick = () => renderTasks("pending");

renderTasks();