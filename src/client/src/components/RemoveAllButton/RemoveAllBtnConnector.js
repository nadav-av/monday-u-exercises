import { connect } from "react-redux";
import { removeAllTasksAction } from "./../../redux/actions/tasksActions";
import { bindActionCreators } from "redux";
import RemoveAllBtn from "./RemoveAllBtn";

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ removeAllTasksAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(RemoveAllBtn);
