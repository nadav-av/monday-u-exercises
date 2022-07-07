import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import { getErrorMsg } from "../../redux/selectors/errorHandleSelector";
import { bindActionCreators } from "redux";
import {
  removeAllTasksAction,
  getTasksAction,
} from "../../redux/actions/tasksActions";
import { setErrorMessageAction } from "../../redux/actions/errorHandleActions";
import Tasks from "./Tasks";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  const errorMsg = getErrorMsg(state);
  return { tasks, errorMsg };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { removeAllTasksAction, getTasksAction, setErrorMessageAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
