import { render, screen } from "@testing-library/react";
import Tasks from "../TasksConnector";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

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
        <Tasks
          tasks={tasks}
          setPresentedTasksNum={() => {}}
          fetchItems={jest.fn(() => tasks)}
        />
      </Provider>
    );

    expect(screen.queryByTestId(`item-${tasks[0].id}`)).toBeDefined();
    expect(screen.queryByTestId(`item-${tasks[1].id}`)).toBeDefined();
  });
});
