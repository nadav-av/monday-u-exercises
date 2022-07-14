import { connect } from "react-redux";
import { getTasks, getIsLoading } from "../../redux/selectors/tasksSelector";
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
  const isLoading = getIsLoading(state);
  return { tasks, errorMsg, isErrorToastVisible, isLoading };
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
