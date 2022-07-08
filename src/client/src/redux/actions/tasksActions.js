import actionTypes from "./tasksActionConstants";
import ItemClient from "./../../services/taskService";
import {
  setErrorMessageAction,
  setIsErrorToastVisibleAction,
} from "./errorHandleActions";
import {
  TASK_EXISTS,
  ERROR_WHILE_REMOVE_ALL,
  ERROR_WHILE_REMOVE,
  ERROR_WHILE_UPDATE,
  ERROR_RESORT,
} from "../../services/globalConsts";

const itemService = new ItemClient();

export const getTasksAction = () => {
  return async (dispatch) => {
    const tasks = await itemService.fetchTasks();
    const sortedTasks = tasks.sort((a, b) => a.position - b.position);
    dispatch(setTasks(sortedTasks));
  };
};

const addTask = (task) => ({
  type: actionTypes.ADD_TASK,
  payload: task,
});

export const addTaskAction = (input, position) => {
  return async (dispatch) => {
    const addedTasks = await itemService.addTask(input, false, position);
    if (addedTasks.status === 200) {
      for (let i = 0; i < addedTasks.response.length; i++) {
        dispatch(addTask(addedTasks.response[i]));
      }
    } else if (addedTasks.status === 409) {
      dispatch(setErrorMessageAction(TASK_EXISTS));
      dispatch(setIsErrorToastVisibleAction(true));
    }
  };
};

const removeTask = (taskID) => ({
  type: actionTypes.REMOVE_TASK,
  payload: taskID,
});

export const removeTaskAction = (id) => {
  return async (dispatch) => {
    const removedTask = await itemService.removeTask(id);
    if (removedTask) {
      dispatch(removeTask(id));
    } else {
      dispatch(setIsErrorToastVisibleAction(true));
      dispatch(setErrorMessageAction(ERROR_WHILE_REMOVE));
    }
  };
};

const removeAllTasks = () => ({
  type: actionTypes.REMOVE_ALL_TASKS,
});

export const removeAllTasksAction = () => {
  return async (dispatch) => {
    const isRemoved = await itemService.removeAllTasks();
    if (isRemoved) {
      dispatch(removeAllTasks());
    } else {
      dispatch(setIsErrorToastVisibleAction(true));
      dispatch(setErrorMessageAction(ERROR_WHILE_REMOVE_ALL));
    }
  };
};

const updateTask = (task) => ({
  type: actionTypes.UPDATE_TASK,
  payload: task,
});

export const updateTaskAction = (task) => {
  return (dispatch) => {
    const updatedTask = itemService.updateTask(task);
    if (updatedTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(setIsErrorToastVisibleAction(true));
      dispatch(setErrorMessageAction(ERROR_WHILE_UPDATE));
    }
  };
};

const setTasks = (tasks) => ({
  type: actionTypes.SET_TASKS,
  payload: tasks,
});

export const setTasksAction = (tasks) => {
  return async (dispatch) => {
    const isUpdated = await itemService.updateTaskOrder(tasks);
    if (isUpdated) {
      dispatch(setTasks(tasks));
    } else {
      dispatch(setIsErrorToastVisibleAction(true));
      dispatch(setErrorMessageAction(ERROR_RESORT));
    }
  };
};

const setEditTask = (task) => ({
  type: actionTypes.SET_EDIT_TASK,
  payload: task,
});

export const setEditTaskAction = (task) => {
  return (dispatch) => {
    dispatch(setEditTask(task));
  };
};
