let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text !== "") {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateProgress();
  }
};

const updateTaskList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})" />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="edit.png" onclick="editTask(${index})" />
          <img src="bin.png" onclick="deleteTask(${index})" />
        </div>
      </div>
    `;

    taskList.appendChild(listItem);
  });
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateProgress();
};

const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTaskList();
  }
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateProgress();
};

const updateProgress = () => {
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;

  const number = document.getElementById("number");
  const progress = document.getElementById("progress");

  number.textContent = `${completed} / ${total}`;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progress.style.width = `${percent}%`;
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
