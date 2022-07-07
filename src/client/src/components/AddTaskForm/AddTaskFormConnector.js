import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTasks, getEditTask } from "../../redux/selectors/tasksSelector";
import {
  addTaskAction,
  updateTaskAction,
  setEditTaskAction
} from "../../redux/actions/tasks_actions";

import AddTaskForm from "./AddTaskForm";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  const editTask = getEditTask(state);
  return { tasks, editTask };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTaskAction, updateTaskAction, setEditTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
