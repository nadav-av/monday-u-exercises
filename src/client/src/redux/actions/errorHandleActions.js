import actionTypes from "./errorHandleConstants";

const setErrorMessage = (message) => ({
  type: actionTypes.SET_ERROR_MSG,
  payload: message,
});

export const setErrorMessageAction = (message) => {
  return (dispatch) => {
    dispatch(setErrorMessage(message));
  };
};
