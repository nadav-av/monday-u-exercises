import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import tasksReducer from "./reducers/taskReducer";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: [thunkMiddleware],
  preloadedState: {},
});
