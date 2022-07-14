import actionTypes from "../actions/errorHandleConstants";

const initialState = {
  errorMsg: "",
  isErrorToastVisible: false,
};

const actionBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR_MSG:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case actionTypes.SET_IS_ERROR_TOAST_VISIBLE:
      return {
        ...state,
        isErrorToastVisible: action.payload,
      };

    default:
      return state;
  }
};

export default actionBarReducer;
