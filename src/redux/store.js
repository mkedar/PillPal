import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const initialState = loadState() || {
  currentUser: null,
  error: null,
  loading: false,
};

const userReducerWithLocalStorage = (state = initialState, action) => {
  const newState = userReducer(state, action);

  // Save the state to local storage after each action
  saveState(newState);

  return newState;
};

export const store = configureStore({
  reducer: { user: userReducerWithLocalStorage },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
