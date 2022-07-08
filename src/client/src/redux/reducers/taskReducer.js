import actionTypes from "../actions/tasksActionConstants";

const initialState = {
  tasksArray: [],
  edittedTask: null,
  isLoading: false,
};

const tasksReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasksArray: [...state.tasksArray, action.payload],
      };

    case actionTypes.REMOVE_TASK:
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.id !== action.payload
        ),
      };

    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        tasksArray: state.tasksArray.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };

    case actionTypes.REMOVE_ALL_TASKS:
      return {
        ...state,
        tasksArray: [],
      };

    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasksArray: action.payload,
      };

    case actionTypes.SET_EDIT_TASK:
      return {
        ...state,
        edittedTask: action.payload,
      };

    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default tasksReducers;
