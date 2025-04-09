import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import trailReducer from './trailSlice';
import eventReducer from './eventSlice';
import userReducer from './userSlice';

// This code configures the Redux store for the application. It imports the necessary reducers from different slices and combines them into a single store using Redux Toolkit's configureStore function. The store is then exported for use in the application.
// The store includes reducers for authentication, trails, events, and user management, allowing the application to manage state related to these features efficiently.


export const store = configureStore({
  reducer: {
    auth: authReducer,
    trail: trailReducer,
    event: eventReducer,
    user: userReducer
  },
});
