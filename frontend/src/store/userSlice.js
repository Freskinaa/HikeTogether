import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllUsersUseCase } from "../use-cases/GetAllUsersUseCase";

export const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await GetAllUsersUseCase.execute();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Getting users failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
