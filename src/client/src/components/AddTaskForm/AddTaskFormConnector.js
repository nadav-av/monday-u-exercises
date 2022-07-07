import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import {
  addTaskAction,
  updateTaskAction,
} from "../../redux/actions/tasks_actions";

import AddTaskForm from "./AddTaskForm";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTaskAction, updateTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
