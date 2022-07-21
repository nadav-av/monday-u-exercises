import actionTypes from "../actions/tasksActionConstants";

const DELETED_ARRAY_SIZE = 10;

const initialState = {
  tasksArray: [],
  edittedTask: null,
  isLoading: false,
  deletedTasksList: [],
  isTasksToRestoreExsits: false,
};

const tasksReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasksArray: [...state.tasksArray, action.payload],

      };

    case actionTypes.REMOVE_TASK: {
      const taskToDelete = state.tasksArray.find(
        (task) => task.id === action.payload
      );
      const deletedTasksList = [...state.deletedTasksList];
      if (deletedTasksList.length === DELETED_ARRAY_SIZE) {
        deletedTasksList.shift();
      }
      deletedTasksList.unshift(taskToDelete);

      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.id !== action.payload
        ),
        deletedTasksList: deletedTasksList,
        isTasksToRestoreExsits: true,
      };
    }

    case actionTypes.RESTORE_DELETED_TASK: {
      const deletedTasksList = [...state.deletedTasksList];
      deletedTasksList.shift();
      const isTasksToRestoreExsits = deletedTasksList.length > 0;
      return {
        ...state,
        deletedTasksList: deletedTasksList,
        isTasksToRestoreExsits: isTasksToRestoreExsits,
      };
    }

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
