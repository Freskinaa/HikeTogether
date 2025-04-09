import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllUsersUseCase } from "../use-cases/GetAllUsersUseCase";
// This code defines a Redux slice for managing user-related actions and state. 
// It includes an asynchronous action for fetching all users using the GetAllUsersUseCase.
// The slice handles the loading state, error handling, and storing the fetched users' data in the Redux store.

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
// The userSlice handles the state for user data, including the list of users, loading state, and error state.

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
