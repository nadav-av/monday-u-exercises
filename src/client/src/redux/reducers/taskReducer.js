import actionTypes from "../constans";

const initialState = {
  tasksArray: [],
  edittedTask: null,
};

const tasksReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      const tasks = [...state.tasksArray];
      const newTask = {
        id: action.payload.id,
        itemName: action.payload.itemName,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        doneAt: action.payload.doneAt,
        position: action.payload.position,
      };
      tasks.push(newTask);
      return { tasksArray: tasks };
    }

    case actionTypes.REMOVE_TASK: {
      const tasks = [...state.tasksArray];
      const taskToRemove = tasks.find((task) => task.id === action.payload);
      const index = tasks.indexOf(taskToRemove);
      tasks.splice(index, 1);
      return { tasksArray: tasks };
    }

    case actionTypes.UPDATE_TASK: {
      const tasks = [...state.tasksArray];
      const taskToUpdate = tasks.find((task) => task.id === action.payload.id);
      const index = tasks.indexOf(taskToUpdate);
      tasks[index] = action.payload;
      return { tasksArray: tasks };
    }

    case actionTypes.REMOVE_ALL_TASKS: {
      const tasks = [];
      return { tasksArray: tasks };
    }

    case actionTypes.SET_TASKS: {
      return { tasksArray: action.payload };
    }

    default:
      return state;
  }
};

export default tasksReducers;
