import actionTypes from "./actionBarConstants";

const setSearchInput = (input) => ({
  type: actionTypes.SET_SEARCH_INPUT,
  payload: input,
});

export const setSearchInputAction = (input) => {
  return (dispatch) => {
    dispatch(setSearchInput(input));
  };
};

const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  payload: filter,
});

export const setFilterAction = (filter) => {
  return (dispatch) => {
    dispatch(setFilter(filter));
  };
};
