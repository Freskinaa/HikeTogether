import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddProfileField from "../../../components/Profile/AddProfileField";
import { vi } from "vitest";

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

vi.mock("../../components/Shared/SelectField/SelectField", () => ({
  default: ({ value, onChange, options, ...props }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      role="combobox"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
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

  it("updates text input field inside the modal", () => {
    render(
      <Provider store={store}>
        <AddProfileField title="Add Age" label="Age" type="number" name="age" />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Age" }));

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "25" } });

    expect(input.value).toBe("25");
  });

  it("updates textarea field inside the modal", () => {
    render(
      <Provider store={store}>
        <AddProfileField
          title="Add Bio"
          label="Bio"
          type="textarea"
          name="bio"
        />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Bio" }));

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello world!" } });

    expect(textarea.value).toBe("Hello world!");
  });
});
