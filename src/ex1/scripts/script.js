const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".tasks-list");

addTaskButton.addEventListener("click", onAddTaskClick);
taskList.addEventListener("click", onTaskButtonsClick);

function handleAlert() {
  const isAlertOn = isAlertShown();
  if (taskInput.value === "") {
    if (!isAlertOn) {
      toggleAlert();
    }
    return true;
  } else return false;
}

function onAddTaskClick(e) {
  if (handleAlert()) {
    return;
  }

  const isAlertOn = isAlertShown();
  if (isAlertOn) {
    toggleAlert();
  }
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  newTask.innerText = taskInput.value;
  taskDiv.appendChild(newTask);

  const completeTaskButton = document.createElement("button");
  completeTaskButton.classList.add("task-complete-btn");
  completeTaskButton.innerHTML = '<i class="fas fa-check"></i>';
  taskDiv.appendChild(completeTaskButton);

  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("task-remove-btn");
  removeTaskButton.innerHTML = '<i class="fas fa-trash"></i>';
  taskDiv.appendChild(removeTaskButton);

  taskList.appendChild(taskDiv);
  taskInput.value = "";
}


function onTaskButtonsClick(e) {
  console.log(e.target);
  if (e.target.classList.contains("task-complete-btn")) {
    e.target.parentElement.classList.toggle("task-completed");
    e.target.classList.toggle("btn-completed");
  } else if (e.target.classList.contains("task-remove-btn")) {
    e.target.parentElement.remove();
  }

}
