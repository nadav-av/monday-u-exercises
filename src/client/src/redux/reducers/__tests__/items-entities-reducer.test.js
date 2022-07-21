import tasksReducers from "../taskReducer";
import actionTypes from "../../actions/tasksActionConstants";

describe("Tasks reducer", () => {
  it("should return the initial state", () => {
    expect(tasksReducers(undefined, {})).toEqual({
      tasksArray: [],
      edittedTask: null,
      isLoading: false,
      deletedTasksList: [],
      isTasksToRestoreExsits: false,
    });
  });
  it("should add task to the state", () => {
    expect(
      tasksReducers(
        {
          tasksArray: [],
          edittedTask: null,
          isLoading: false,
          deletedTasksList: [],
          isTasksToRestoreExsits: false,
        },
        {
          type: actionTypes.ADD_TASK,
          payload: {
            id: 0,
            itemName: "nadav",
            position: 0,
            doneAt: null,
          },
        }
      )
    ).toEqual({
      tasksArray: [
        {
          id: 0,
          itemName: "nadav",
          position: 0,
          doneAt: null,
        },
      ],
      edittedTask: null,
      isLoading: false,
      deletedTasksList: [],
      isTasksToRestoreExsits: false,
    });
  });
  it("should remove task from the state", () => {
    expect(
      tasksReducers(
        {
          tasksArray: [
            {
              id: 0,
              itemName: "nadav",
              position: 0,
              doneAt: null,
            },
          ],
          edittedTask: null,
          isLoading: false,
          deletedTasksList: [],
          isTasksToRestoreExsits: false,
        },
        {
          type: actionTypes.REMOVE_TASK,
          payload: 0,
        }
      )
    ).toEqual({
      tasksArray: [],
      edittedTask: null,
      isLoading: false,
      deletedTasksList: [
        {
          id: 0,
          itemName: "nadav",
          position: 0,
          doneAt: null,
        },
      ],
      isTasksToRestoreExsits: true,
    });
  });
  it("should restore task from the state", () => {
    expect(
      tasksReducers(
        {
          tasksArray: [
            {
              id: 1,
              itemName: "some existTask",
              position: 1,
              doneAt: null,
            },
          ],
          edittedTask: null,
          isLoading: false,
          deletedTasksList: [
            {
              id: 0,
              itemName: "a task to restore",
              position: 0,
              doneAt: null,
            },
          ],
          isTasksToRestoreExsits: true,
        },
        {
          type: actionTypes.RESTORE_DELETED_TASK,
        }
      )
    ).toEqual({
      tasksArray: [
        {
          id: 1,
          itemName: "some existTask",
          position: 1,
          doneAt: null,
        },
      ],
      edittedTask: null,
      isLoading: false,
      deletedTasksList: [],
      isTasksToRestoreExsits: false,
    });
  });
  it("should update task in the state", () => {
    expect(
      tasksReducers(
        {
          tasksArray: [
            {
              id: 0,
              itemName: "nadav",
              position: 0,
              doneAt: null,
            },
          ],
          edittedTask: null,
          isLoading: false,
          deletedTasksList: [],
          isTasksToRestoreExsits: false,
        },
        {
          type: actionTypes.UPDATE_TASK,
          payload: {
            id: 0,
            itemName: "daniel",
            position: 0,
            doneAt: null,
          },
        }
      )
    ).toEqual({
      tasksArray: [
        {
          id: 0,
          itemName: "daniel",
          position: 0,
          doneAt: null,
        },
      ],
      edittedTask: null,
      isLoading: false,
      deletedTasksList: [],
      isTasksToRestoreExsits: false,
    });
  });
});
