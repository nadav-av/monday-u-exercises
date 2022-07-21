import renderer from "react-test-renderer";
import About from "../About";

it("renders correctly", () => {
  const tree = renderer.create(<About></About>).toJSON();
  expect(tree).toMatchSnapshot();
});
