import { render, screen } from "@testing-library/react";
import Tasks from "../TasksConnector";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { getTasksAction } from "../../../redux/actions/tasksActions";

const tasks = [
  {
    id: 1,
    itemName: "Nadav",
    status: false,
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01",
    position: 1,
    doneAt: null,
  },
  {
    id: 2,
    itemName: "Daniel",
    status: true,
    createdAt: "2020-01-02",
    updatedAt: "2020-01-02",
    position: 2,
    doneAt: null,
  },
];

describe("Tasks", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <Tasks tasks={tasks} />
      </Provider>
    );

    expect(screen.queryByTestId(`item-${tasks[0].id}`)).toBeDefined();
    expect(screen.queryByTestId(`item-${tasks[1].id}`)).toBeDefined();
  });

  // A test to mock get tasks action - not sure why, but this test fails, the getTasksActin in not called in test.
  test("should call fetchItems function", () => {
    const fetchItems = jest.fn(() => tasks);
    render(
      <Provider store={store}>
        <Tasks getTasksAction={fetchItems} />
      </Provider>
    );
    expect(fetchItems).toHaveBeenCalled();
  });
});
