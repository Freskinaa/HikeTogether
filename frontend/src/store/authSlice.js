import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUseCase } from '../use-cases/RegisterUseCase';
import { LoginUseCase } from '../use-cases/LoginUseCase';
import { GetUserByIdUseCase } from '../use-cases/GetUserByIdUseCase';

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
      localStorage.setItem('accessToken', response.accesstoken);
      localStorage.setItem('refreshToken', response.refreshToken);
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
      localStorage.removeItem('accessToken');
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
        state.accesstoken = action.payload.accesstoken;
        state.refreshToken = action.payload.refreshToken;
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
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
