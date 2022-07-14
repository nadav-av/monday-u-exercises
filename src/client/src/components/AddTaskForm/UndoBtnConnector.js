import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { restoreDeletedTaskAction } from "../../redux/actions/tasksActions";
import {
  getDeletedTasks,
  getTasksLength,
} from "../../redux/selectors/tasksSelector";
import UndoBtn from "./UndoBtn";

const mapStateToProps = (state) => {
  return {
    deletedTasks: getDeletedTasks(state),
    tasksLength: getTasksLength(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ restoreDeletedTaskAction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UndoBtn);
