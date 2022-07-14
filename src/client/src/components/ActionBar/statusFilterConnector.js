import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setFilterAction } from "../../redux/actions/actionBarActions";
import StatusFilter from './StatusFilter';


const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ setFilterAction }, dispatch);
};
export default connect(null, mapDispatchToProps)(StatusFilter);
