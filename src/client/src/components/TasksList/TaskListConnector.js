import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import {
  removeTaskAction,
  setTasksAction,
  updateTaskAction,
} from "./../../redux/actions/tasks_actions";
import { bindActionCreators } from "redux";
import TasksList from "./TasksList";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { updateTaskAction, setTasksAction, removeTaskAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
