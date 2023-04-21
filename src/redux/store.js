import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import current from './slices/currentSlice'

export const store = configureStore({
  reducer: {
    filter,
    current,
  },
})
