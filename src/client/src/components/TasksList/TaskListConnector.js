import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import {
  getFilter,
  getSearchInput,
} from "../../redux/selectors/actionBarSelector";
import {
  removeTaskAction,
  setTasksAction,
  updateTaskAction,
} from "./../../redux/actions/tasksActions";
import { bindActionCreators } from "redux";
import TasksList from "./TasksList";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  const statusFilter = getFilter(state);
  const searchInput = getSearchInput(state);
  return { tasks, searchInput, statusFilter };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { updateTaskAction, setTasksAction, removeTaskAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
