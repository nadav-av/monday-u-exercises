import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemClient from "../../services/taskService";

export const getTasksAsync = createAsyncThunk(
  "tasksk/getTasksAsync",
  async () => {
    const taskService = new ItemClient();
    const tasks = await taskService.fetchTasks();
    return { tasks };
  }
);

export const addTaskAsync = createAsyncThunk(
  "tasksk/addTaskAsync",
  async (payload) => {
    const taskService = new ItemClient();
    const result = await taskService.addTask(
      payload.input,
      payload.status,
      payload.position
    );
    let newTask = null;
    if (result.status === 200) {
      newTask = result.response;
    }
    if (newTask) {
      return { newTask };
    }
  }
);

export const removeTaskAsync = createAsyncThunk(
  "tasksk/removeTaskAsync",
  async (payload) => {
    const taskService = new ItemClient();
    const result = await taskService.removeTask(payload);
    if (result) {
      return { taskID: payload };
    }
  }
);

export const removeAllTasksAsync = createAsyncThunk(
  "tasksk/removeAllTasksAsync",
  async () => {
    const taskService = new ItemClient();
    const result = await taskService.removeAllTasks();
    if (result) {
      return {};
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasksk/updateTaskAsync",
  async (payload) => {
    console.log("payload", payload);
    const taskService = new ItemClient();
    const result = await taskService.updateTask(payload);
    if (result) {
      return { taskToUpdate: result };
    }
  }
);

const taskSlice = createSlice({
  name: "task",

  initialState: [],

  reducers: {
    // addTask: (state, action) => {
    //   const tasks = [...state];
    //   const newTask = {
    //     id: action.payload.id,
    //     itemName: action.payload.itemName,
    //     status: action.payload.status,
    //     createdAt: action.payload.createdAt,
    //     updatedAt: action.payload.updatedAt,
    //     doneAt: action.payload.doneAt,
    //     position: action.payload.position,
    //   };
    //   tasks.push(newTask);
    //   state = tasks;
    // },
    // updateTask: (state, action) => {
    //   const tasks = [...state];
    //   const taskToUpdate = tasks.find((task) => task.id === action.payload.id);
    //   taskToUpdate.itemName = action.payload.itemName;
    //   taskToUpdate.status = action.payload.status;
    //   taskToUpdate.createdAt = action.payload.createdAt;
    //   taskToUpdate.updatedAt = action.payload.updatedAt;
    //   taskToUpdate.doneAt = action.payload.doneAt;
    //   taskToUpdate.position = action.payload.position;
    //   return tasks;
    // },
    // removeTask: (state, action) => {
    //   const tasks = [...state];
    //   const taskToRemove = tasks.find((task) => task.id === action.payload);
    //   const index = tasks.indexOf(taskToRemove);
    //   tasks.splice(index, 1);
    //   return tasks;
    // },
    // removeAllTasks: (state, action) => {
    //   return [];
    // },
    // setTasks: (state, action) => {
    //   const tasks = [...action.payload];
    //   return tasks;
    // },
  },
  extraReducers: {
    [getTasksAsync.fulfilled]: (state, action) => {
      return action.payload.tasks;
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      const tasks = [...state];
      if (Array.isArray(action.payload.newTask)) {
        tasks.push(...action.payload.newTask);
      } else {
        tasks.push(action.payload.newTask);
      }
      return tasks;
    },
    [removeTaskAsync.fulfilled]: (state, action) => {
      const tasks = [...state];
      const taskToRemove = tasks.find(
        (task) => task.id === action.payload.taskID
      );
      const index = tasks.indexOf(taskToRemove);
      tasks.splice(index, 1);
      return tasks;
    },
    [removeAllTasksAsync.fulfilled]: (state, action) => {
      return [];
    },
    [updateTaskAsync.fulfilled]: (state, action) => {
      const tasks = [...state];
      const taskToUpdate = tasks.find(
        (task) => task.id === action.payload.taskToUpdate.id
      );
      taskToUpdate.itemName = action.payload.taskToUpdate.itemName;
      taskToUpdate.status = action.payload.taskToUpdate.status;
      taskToUpdate.createdAt = action.payload.taskToUpdate.createdAt;
      taskToUpdate.updatedAt = action.payload.taskToUpdate.updatedAt;
      taskToUpdate.doneAt = action.payload.taskToUpdate.doneAt;
      taskToUpdate.position = action.payload.taskToUpdate.position;
      return tasks;
    },
  },
});

export const { addTask } = taskSlice.actions;
export const { updateTask } = taskSlice.actions;
export const { removeTask } = taskSlice.actions;
export const { removeAllTasks } = taskSlice.actions;
export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
