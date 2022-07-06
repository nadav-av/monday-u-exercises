import actionTypes from "../constans";

const initialState = {
  tasksArray: [
    {
      id: 2,
      itemName: "Task 1",
      status: false,
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
      doneAt: null,
      position: 1,
    },
    {
      id: 3,
      itemName: "Task 2",
      status: false,
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
      doneAt: null,
      position: 2,
    },
  ],
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
      return tasks;
    }

    case actionTypes.REMOVE_TASK: {
      const tasks = [...state.tasksArray];
      const taskToRemove = tasks.find((task) => task.id === action.payload);
      const index = tasks.indexOf(taskToRemove);
      tasks.splice(index, 1);
      return tasks;
    }

    case actionTypes.UPDATE_TASK: {
      const tasks = [...state.tasksArray];
      const taskToUpdate = tasks.find((task) => task.id === action.payload.id);
      const index = tasks.indexOf(taskToUpdate);
      tasks[index] = action.payload;
      return tasks;
    }

    case actionTypes.REMOVE_ALL_TASKS: {
      const tasks = [];
      return tasks;
    }

    case actionTypes.SET_TASKS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default tasksReducers;
