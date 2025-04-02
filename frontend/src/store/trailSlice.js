import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTrailsUseCase } from "../use-cases/GetAllTrailsUseCase";

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
