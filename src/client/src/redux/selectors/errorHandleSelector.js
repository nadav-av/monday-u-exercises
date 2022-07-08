const getErrorHandeState = (state) => state.errorHandle;

export const getErrorMsg = (state) => getErrorHandeState(state).errorMsg;

export const getIsErrorToastVisible = (state) => getErrorHandeState(state).isErrorToastVisible;
