import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllEventsUseCase } from "../use-cases/GetAllEventsUseCase";
import { CreateEventUseCase } from "../use-cases/CreateEventUseCase";
import { DeleteEventUseCase } from "../use-cases/DeleteEventUseCase";
import { UpdateEventUseCase } from "../use-cases/UpdateEventUseCase";
import { GetEventByIdUseCase } from "../use-cases/GetEventByIdUseCase";

export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      return await GetAllEventsUseCase.execute();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Events not found"
      );
    }
  }
);

export const getEventById = createAsyncThunk(
  "event/getEventById",
  async (eventId, { rejectWithValue }) => {
    try {
      return await GetEventByIdUseCase.execute(eventId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Event not found"
      );
    }
  }
);


export const createEventAsync = createAsyncThunk(
  "event/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await CreateEventUseCase.execute(eventData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cannot create event"
      );
    }
  }
);

export const updateEventAsync = createAsyncThunk(
  "event/updateEvent",
  async (id, eventData, { rejectWithValue }) => {
    try {
      const response = await UpdateEventUseCase.execute(id, eventData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cannot update event"
      );
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await DeleteEventUseCase.execute(eventId);
      return eventId; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cannot delete event"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    currentEvent: null,
    error: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEventAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(createEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEventAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        ); 
        state.loading = false;
      })
      .addCase(deleteEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEventAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        const index = state.events.findIndex((event) => event._id === updatedEvent._id);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
        state.loading = false;
      })
      .addCase(updateEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
        state.loading = false;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
