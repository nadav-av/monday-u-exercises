import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import { bindActionCreators } from "redux";
import {
  removeAllTasksAction,
  getTasksAction,
} from "../../redux/actions/tasks_actions";
import Tasks from "./Tasks";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ removeAllTasksAction, getTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
