import { render } from "@testing-library/react";
import Login from "../src/pages/login";

// Mock `react-router-dom` useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

test("renders login component", () => {
  render(<Login />);
});
