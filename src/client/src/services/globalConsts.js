const TaskStatus = Object.freeze({
  ALL: "all",
  COMPLETED: "completed",
  UNCOMPLETED: "uncompleted",
});

const TASK_EXISTS = "Task already exists";
const EMPTY_INPUT = "Input cannot be empty, Please enter a task";
const ERROR_WHILE_REMOVE_ALL = "Error while removing all tasks";
const ERROR_WHILE_REMOVE = "Error while removing task";
const ERROR_WHILE_UPDATE = "Error while updating task";
const ERROR_RESORT = "Error while resorting tasks";

const DEBOUNCE_RATE_MS = 200;

export {
  TaskStatus,
  TASK_EXISTS,
  EMPTY_INPUT,
  ERROR_WHILE_REMOVE_ALL,
  ERROR_WHILE_REMOVE,
  ERROR_WHILE_UPDATE,
  ERROR_RESORT,
  DEBOUNCE_RATE_MS,
};
