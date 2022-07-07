import actionTypes from "../constans";

const addTask = (task) => ({
  type: actionTypes.ADD_TASK,
  payload: task,
});

export const addTaskAction = (task) => {
  return async (dispatch) => {
    dispatch(addTask(task));
  };
};

const removeTask = (taskID) => ({
  type: actionTypes.REMOVE_TASK,
  payload: taskID,
});

export const removeTaskAction = (id) => {
  return (dispatch) => {
    dispatch(removeTask(id));
  };
};

const removeAllTasks = () => ({
  type: actionTypes.REMOVE_ALL_TASKS,
});

export const removeAllTasksAction = () => {
  return (dispatch) => {
    dispatch(removeAllTasks());
  };
};

const updateTask = (task) => ({
  type: actionTypes.EDIT_TASK,
  payload: task,
});

export const updateTaskAction = (task) => {
  return (dispatch) => {
    dispatch(updateTask(task));
  };
};

const setTasks = (tasks) => ({
  type: actionTypes.SET_TASKS,
  payload: tasks,
});

export const setTasksAction = (tasks) => {
  return (dispatch) => {
    dispatch(setTasks(tasks));
  };
};
