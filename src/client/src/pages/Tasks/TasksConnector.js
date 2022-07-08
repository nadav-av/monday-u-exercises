import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import {
  getErrorMsg,
  getIsErrorToastVisible,
} from "../../redux/selectors/errorHandleSelector";
import { bindActionCreators } from "redux";
import {
  removeAllTasksAction,
  getTasksAction,
} from "../../redux/actions/tasksActions";
import {
  setErrorMessageAction,
  setIsErrorToastVisibleAction,
} from "../../redux/actions/errorHandleActions";
import Tasks from "./Tasks";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  const errorMsg = getErrorMsg(state);
  const isErrorToastVisible = getIsErrorToastVisible(state);
  return { tasks, errorMsg, isErrorToastVisible };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      removeAllTasksAction,
      getTasksAction,
      setErrorMessageAction,
      setIsErrorToastVisibleAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
