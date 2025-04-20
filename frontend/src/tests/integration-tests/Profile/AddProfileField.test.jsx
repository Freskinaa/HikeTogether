import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddProfileField from "../../../components/Profile/AddProfileField";
import { vi } from "vitest";

// Mock dependencies
vi.mock("../../components/Shared/Button/Button", () => ({
  default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
vi.mock("../../components/Shared/Modal/Modal", () => ({
  default: ({ children, onClose }) => (
    <div>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Close">
        Close
      </button>
    </div>
  ),
}));
vi.mock("../../components/Shared/InputField/InputField", () => ({
  default: ({ value, onChange, ...props }) => (
    <input value={value} onChange={onChange} {...props} />
  ),
}));

const mockStore = configureStore([]);

describe("AddProfileField Integration Test", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          name: "John Doe",
          gender: "",
        },
      },
    });
  });

  it.skip("closes the modal when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <AddProfileField
          title="Add Gender"
          label="Gender"
          type="select"
          name="gender"
        />
      </Provider>
    );

    // Open the modal by clicking the button
    const addButton = screen.getByRole("button", { name: "Add Gender" });
    fireEvent.click(addButton);

    // Click the close button
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    // Verify the modal is closed
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});