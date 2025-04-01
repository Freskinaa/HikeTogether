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
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await LoginUseCase.execute(credentials);
      localStorage.setItem('accessToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await GetUserByIdUseCase.execute(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'User not found');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('accessToken') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
