import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllEventsUseCase } from "../use-cases/GetAllEventsUseCase";
import { CreateEventUseCase } from "../use-cases/CreateEventUseCase";

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

export const createEventAsync = createAsyncThunk(
  "event/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = CreateEventUseCase.execute(eventData);
      console.log(response);

      return response
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cannot create event"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
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
      });

    builder
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
      });
  },
});

export default eventSlice.reducer;
