const getTasksState = (state) => state.tasks;

export const getTasks = (state) => getTasksState(state).tasksArray;

export const getEditTask = (state) => getTasksState(state).edittedTask;
