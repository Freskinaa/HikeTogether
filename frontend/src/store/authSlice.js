import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUseCase } from '../use-cases/RegisterUseCase';
import { LoginUseCase } from '../use-cases/LoginUseCase';
import { GetUserByIdUseCase } from '../use-cases/GetUserByIdUseCase';
// This code defines Redux slice for authentication, including actions for registering, logging in, fetching user by ID, 
// and restoring session from local storage. The actions are asynchronous (using createAsyncThunk) and interact with use cases 
// like RegisterUseCase, LoginUseCase, and GetUserByIdUseCase to handle the respective authentication operations.
// The state includes properties for the user, tokens, loading state, registration status, and error handling.
// The extraReducers handle the async actions for login, registration, fetching user data, and session restoration.
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      return await RegisterUseCase.execute(userData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await LoginUseCase.execute(credentials);
      
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await GetUserByIdUseCase.execute(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'User not found');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession', 
  async (_, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const user = localStorage.getItem('user')

      if (!accessToken) {
        throw new Error('Token not found');
      }

      return {
        accessToken,
        refreshToken,
        user: JSON.parse(user),
      };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
// The authSlice handles the state for authentication, including user data, tokens, and error handling.
// It also includes actions for logging out and handling async actions from createAsyncThunk.
// The slice is created using createSlice from Redux Toolkit, which simplifies the process of creating reducers and actions
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accesstoken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isRegistered: false,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accesstoken = null;
      state.refreshToken = null;
      state.isRegistered = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accesstoken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.accesstoken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error?.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
