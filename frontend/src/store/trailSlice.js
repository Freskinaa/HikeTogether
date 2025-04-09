import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTrailsUseCase } from "../use-cases/GetAllTrailsUseCase";
// Redux slice for managing trails state.
// This slice includes actions for getting all trails and handling the loading state, errors, and storing fetched trails.
// The `getAllTrails` action is asynchronous and uses the `GetAllTrailsUseCase` to fetch the data from the service layer

// Async thunk for fetching all trails
// It calls the GetAllTrailsUseCase and handles the async logic, including error handling.
// The `rejectWithValue` function is used to return a custom error message if the request fails.
// The `execute` method of the use case is called to perform the actual data fetching.
// The `getAllTrails` action is dispatched to fetch all trails from the server.
// The async action handles the loading state and errors using the `extraReducers` in the slice.
export const getAllTrails = createAsyncThunk(
  "trail/getAllTrails",
  async (_, { rejectWithValue }) => {
    try {
      return await GetAllTrailsUseCase.execute();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Trails not found"
      );
    }
  }
);

const trailSlice = createSlice({
  name: "trail",
  initialState: {
    trails: [],
    error: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTrails.fulfilled, (state, action) => {
        state.trails = action.payload;
        state.loading = false;
      })
      .addCase(getAllTrails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trailSlice.reducer;
