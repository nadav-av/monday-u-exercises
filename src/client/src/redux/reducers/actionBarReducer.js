import actionTypes from "../actions/actionBarConstants";
import { TaskStatus } from "../../services/globalConsts";

const initialState = {
  searchInput: "",
  filter: TaskStatus.ALL,
};

const actionBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default actionBarReducer;
