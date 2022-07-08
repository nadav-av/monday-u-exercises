import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import tasksReducer from "./reducers/taskReducer";
import actionBarReducer from "./reducers/actionBarReducer";
import errorHandleReducer from "./reducers/errorHandleReducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    actionBar: actionBarReducer,
    errorHandle: errorHandleReducer,
  },
  middleware: [thunkMiddleware, logger],
  preloadedState: {},
});
