import actionTypes from "./errorHandleConstants";

const setErrorMessage = (message) => ({
  type: actionTypes.SET_ERROR_MSG,
  payload: message,
});

export const setErrorMessageAction = (message) => {
  return (dispatch) => {
    console.log("message", message);
    dispatch(setErrorMessage(message));
  };
};

const setIsErrorToastVisible = (isVisible) => ({
  type: actionTypes.SET_IS_ERROR_TOAST_VISIBLE,
  payload: isVisible,
});

export const setIsErrorToastVisibleAction = (isVisible) => {
  return (dispatch) => {
    dispatch(setIsErrorToastVisible(isVisible));
  };
};
