import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import trailReducer from './trailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trail: trailReducer
  },
});
