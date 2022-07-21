import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import Statistics from "./Statistics";

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};
export default connect(mapStateToProps, null)(Statistics);
