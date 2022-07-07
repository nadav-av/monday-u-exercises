import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import {
  removeTaskAction,
  updateTaskAction,
  setEditTaskAction
} from "./../../redux/actions/tasks_actions";
import { bindActionCreators } from "redux";
import TaskItem from "./TaskItem";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ updateTaskAction, removeTaskAction, setEditTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
