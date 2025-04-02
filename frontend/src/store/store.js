import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import trailReducer from './trailSlice';
import eventReducer from './eventSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trail: trailReducer,
    event: eventReducer
  },
});
