import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { getDefaultNormalizer } from '@testing-library/react'
import userReducer from './user/userSlice.js';

export const store = configureStore({
  reducer: {user: userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})