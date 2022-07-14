import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSearchInput } from "./../../redux/selectors/actionBarSelector";
import { setSearchInputAction } from "./../../redux/actions/actionBarActions";
import SearchBar from "./SearchBar";

const mapStateToProps = (state, ownProps) => {
  const searchInput = getSearchInput(state);
  return { searchInput };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ setSearchInputAction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
