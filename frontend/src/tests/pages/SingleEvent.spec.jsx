import { render, screen, fireEvent } from "@testing-library/react";
import SingleEvent from "../../pages/Event/SingleEvent";
import { vi } from "vitest";
import React from "react";

const mockDispatch = vi.fn(() => Promise.resolve());
const mockNavigate = vi.fn();

vi.mock("react-redux", () => {
  const actual = vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(),
  };
});

vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
  useNavigate: () => mockNavigate,
}));

vi.mock("antd", async () => {
  const antd = await vi.importActual("antd");
  return {
    ...antd,
    Button: ({ onClick, children }) => (
      <button onClick={onClick} data-testid="antd-button">
        {children}
      </button>
    ),
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

import { useSelector } from "react-redux";
vi.mocked(useSelector);

const mockEvent = {
  _id: "1",
  title: "Test Event",
  description: "This is a test event",
  date: new Date().toISOString(),
  location: "Mountain Trail",
  duration: 60,
  maxAttendees: 10,
  attendees: [],
  creator: {
    _id: "user1",
    firstName: "Alice",
    lastName: "Smith",
  },
};

describe("SingleEvent Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading if event not found yet", () => {
    useSelector.mockImplementation((callback) =>
      callback({ event: { events: [] }, auth: { user: { _id: "user2" } } })
    );

    render(<SingleEvent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders event info and join button if user hasn't joined", () => {
    useSelector.mockImplementation((callback) =>
      callback({ event: { events: [mockEvent] }, auth: { user: { _id: "user2" } } })
    );

    render(<SingleEvent />);
    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Join Event")).toBeInTheDocument();
  });

  it("renders leave button if user is already joined", () => {
    const joinedEvent = {
      ...mockEvent,
      attendees: [{ _id: "user2" }],
    };

    useSelector.mockImplementation((callback) =>
      callback({ event: { events: [joinedEvent] }, auth: { user: { _id: "user2" } } })
    );

    render(<SingleEvent />);
    expect(screen.getByText("Leave Event")).toBeInTheDocument();
  });

  it("renders delete button if user is creator", () => {
    useSelector.mockImplementation((callback) =>
      callback({ event: { events: [mockEvent] }, auth: { user: { _id: "user1" } } })
    );

    render(<SingleEvent />);
    expect(screen.getByText("Delete Event")).toBeInTheDocument();
  });

  it("calls dispatch when joining an event", () => {
    useSelector.mockImplementation((callback) =>
      callback({ event: { events: [mockEvent] }, auth: { user: { _id: "user2" } } })
    );

    render(<SingleEvent />);
    fireEvent.click(screen.getByText("Join Event"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
