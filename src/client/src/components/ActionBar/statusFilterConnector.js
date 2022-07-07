import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFilter } from "../../redux/selectors/actionBarSelector";
import { setFilterAction } from "../../redux/actions/actionBarActions";
import StatusFilter from './StatusFilter';

const mapStateToProps = (state, ownProps) => {
  const searchInput = getFilter(state);
  return { searchInput };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ setFilterAction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
