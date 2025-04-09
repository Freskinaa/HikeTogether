import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllUsersUseCase } from "../use-cases/GetAllUsersUseCase";
// This code defines a Redux slice for managing user-related actions and state. 
// It includes an asynchronous action for fetching all users using the GetAllUsersUseCase.
// The slice handles the loading state, error handling, and storing the fetched users' data in the Redux store.
// The `getAllUsersAsync` action is dispatched to fetch all users from the server.
// The async action handles the loading state and errors using the `extraReducers` in the slice.

// Async thunk for fetching all users
// It calls the GetAllUsersUseCase and handles the async logic, including error handling.

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
// It uses the createSlice function from Redux Toolkit to define the initial state and reducers for handling actions.

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

// The userSlice reducer is exported for use in the Redux store configuration.
export default userSlice.reducer;
