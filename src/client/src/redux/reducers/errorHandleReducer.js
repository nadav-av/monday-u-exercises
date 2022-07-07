import actionTypes from "../actions/errorHandleConstants";

const initialState = {
  errorMsg: "",
};

const actionBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR_MSG:
      return {
        ...state,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default actionBarReducer;
