import tasks from "./taskReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  tasks,
});

export default allReducers;
