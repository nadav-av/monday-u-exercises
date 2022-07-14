const getActionBarState = (state) => state.actionBar;

export const getSearchInput = (state) => getActionBarState(state).searchInput;
export const getFilter = (state) => getActionBarState(state).filter;
