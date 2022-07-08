const getTasksState = (state) => state.tasks;

export const getTasks = (state) => getTasksState(state).tasksArray;

export const getTasksLength = (state) => getTasksState(state).tasksArray.length;

export const getEditTask = (state) => getTasksState(state).edittedTask;

export const getIsLoading = (state) => getTasksState(state).isLoading;

export const getDeletedTasks = (state) => getTasksState(state).deletedTasksList;

export const getIsTaskToRestoreExists = (state) =>
  getTasksState(state).isTasksToRestoreExsits;
