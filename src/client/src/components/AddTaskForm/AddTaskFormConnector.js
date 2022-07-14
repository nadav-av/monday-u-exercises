import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getTasks,
  getEditTask,
  getIsTaskToRestoreExists,
} from "../../redux/selectors/tasksSelector";
import {
  getErrorMsg,
  getIsErrorToastVisible,
} from "../../redux/selectors/errorHandleSelector";
import {
  setErrorMessageAction,
  setIsErrorToastVisibleAction,
} from "../../redux/actions/errorHandleActions";
import {
  addTaskAction,
  updateTaskAction,
  setEditTaskAction,
} from "../../redux/actions/tasksActions";

import AddTaskForm from "./AddTaskForm";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  const editTask = getEditTask(state);
  const errorMsg = getErrorMsg(state);
  const isErrorToastVisible = getIsErrorToastVisible(state);
  const isTasksToRestoreExists = getIsTaskToRestoreExists(state);
  return {
    tasks,
    editTask,
    errorMsg,
    isErrorToastVisible,
    isTasksToRestoreExists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTaskAction,
      updateTaskAction,
      setEditTaskAction,
      setErrorMessageAction,
      setIsErrorToastVisibleAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
