import renderer from "react-test-renderer";
import TasksList from "./../TaskListConnector";
import { store } from "./../../../redux/store";
import { Provider } from "react-redux";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <TasksList />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
