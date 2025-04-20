import { configureStore } from "@reduxjs/toolkit";
import eventReducer, {
  getAllEvents,
  createEventAsync,
  deleteEventAsync,
  getEventById,
} from "../../../store/eventSlice";
import { vi } from "vitest";

// Mock the use cases
vi.mock("../../../use-cases/GetAllEventsUseCase", () => ({
  GetAllEventsUseCase: {
    execute: vi.fn(),
  },
}));

vi.mock("../../../use-cases/CreateEventUseCase", () => ({
  CreateEventUseCase: {
    execute: vi.fn(),
  },
}));

vi.mock("../../../use-cases/DeleteEventUseCase", () => ({
  DeleteEventUseCase: {
    execute: vi.fn(),
  },
}));

vi.mock("../../../use-cases/GetEventByIdUseCase", () => ({
  GetEventByIdUseCase: {
    execute: vi.fn(),
  },
}));

describe("eventSlice Integration Test", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        event: eventReducer,
      },
    });
    vi.clearAllMocks();
  });

  it("fetches all events successfully", async () => {
    const mockEvents = [{ _id: "1", name: "Event 1" }, { _id: "2", name: "Event 2" }];
    const { GetAllEventsUseCase } = await import("../../../use-cases/GetAllEventsUseCase");
    GetAllEventsUseCase.execute.mockResolvedValue(mockEvents);

    await store.dispatch(getAllEvents());

    const state = store.getState().event;
    expect(state.events).toEqual(mockEvents);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("handles error when fetching all events fails", async () => {
    const { GetAllEventsUseCase } = await import("../../../use-cases/GetAllEventsUseCase");
    GetAllEventsUseCase.execute.mockRejectedValue({
      response: { data: { message: "Events not found" } },
    });

    await store.dispatch(getAllEvents());

    const state = store.getState().event;
    expect(state.events).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Events not found");
  });

  it("creates a new event successfully", async () => {
    const mockEvent = { _id: "1", name: "New Event" };
    const { CreateEventUseCase } = await import("../../../use-cases/CreateEventUseCase");
    CreateEventUseCase.execute.mockResolvedValue(mockEvent);

    await store.dispatch(createEventAsync(mockEvent));

    const state = store.getState().event;
    expect(state.events).toContainEqual(mockEvent);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("deletes an event successfully", async () => {
    const mockEventId = "1";
    const initialState = {
      events: [{ _id: "1", name: "Event 1" }, { _id: "2", name: "Event 2" }],
      currentEvent: null,
      error: null,
      loading: null,
    };
    store = configureStore({
      reducer: {
        event: eventReducer,
      },
      preloadedState: { event: initialState },
    });

    const { DeleteEventUseCase } = await import("../../../use-cases/DeleteEventUseCase");
    DeleteEventUseCase.execute.mockResolvedValue();

    await store.dispatch(deleteEventAsync(mockEventId));

    const state = store.getState().event;
    expect(state.events).toEqual([{ _id: "2", name: "Event 2" }]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("fetches an event by ID successfully", async () => {
    const mockEvent = { _id: "1", name: "Event 1" };
    const { GetEventByIdUseCase } = await import("../../../use-cases/GetEventByIdUseCase");
    GetEventByIdUseCase.execute.mockResolvedValue(mockEvent);

    await store.dispatch(getEventById("1"));

    const state = store.getState().event;
    expect(state.currentEvent).toEqual(mockEvent);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});